import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { AppDataSource } from '../database/typeorm.config.js';
import {
  DataSource,
  EntityManager,
  FindOptionsWhere,
  ILike,
  In,
  Not,
  QueryBuilder,
  Repository,
} from 'typeorm';
import { ChatMembers } from '../chat_members/entities/chat_member.entity.js';
import { Chat } from './entities/chat.entity.js';
import { failedResponse, successResponse } from '../common/utlis/responses.js';
import { ChatTypeEnum } from './enum/chat.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatResponse } from './interfaces/chat.interface.js';
import { User } from '../users/entities/users.entity.js';
import { FilterChatDto } from './dto/filter-chat.dto.js';
import { CreateGroupDto } from './dto/create-group.dto.js';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createChatDto: CreateChatDto, userId: number) {
    const chat = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        const memberRepo = manager.getRepository(ChatMembers);
        const chatRepo = manager.getRepository(Chat);

        if (createChatDto.type === ChatTypeEnum.PRIVATE) {
          const chatList = await memberRepo.find({
            relations: { Chat: true },
            where: { memberId: userId, Chat: { type: ChatTypeEnum.PRIVATE } },
            select: { memberId: true, chatId: true },
          });

          const chatIds = chatList.map((chat) => chat.chatId);

          const exisitedChat = await memberRepo.findOneBy({
            memberId: createChatDto.memberId,
            chatId: In(chatIds),
          });

          if (exisitedChat)
            throw new ConflictException(failedResponse('Chat Already exist'));

          const chat = chatRepo.create(createChatDto);
          const savedChat = await chatRepo.save(chat);

          const member1 = memberRepo.create({
            chatId: savedChat.id,
            memberId: userId,
          });
          const member2 = memberRepo.create({
            chatId: savedChat.id,
            memberId: createChatDto.memberId,
          });

          await memberRepo.save(member1);
          await memberRepo.save(member2);

          return savedChat;
        }
      },
    );

    if (!chat)
      throw new InternalServerErrorException(
        failedResponse('Chat creation failed, Please try again'),
      );

    const savedChat = await this.getChat(chat.id, userId);
    return successResponse<ChatResponse>('chat created sucessfully', savedChat);
  }

  async createGroup(createGroupDto : CreateGroupDto, userId : number) {
    const chat =  await this.dataSource.transaction(async (manager : EntityManager) => {
      const chatRepo = manager.getRepository(Chat);
      const memberRepo = manager.getRepository(ChatMembers);
      const userRepo = manager.getRepository(User)

      const createGroup = chatRepo.create({...createGroupDto, type : ChatTypeEnum.GROUP});
      const savedGroup = await chatRepo.save(createGroup);

      const memberIds = createGroupDto.memberId;
      const groupId = savedGroup.id;


      //create user as a member
      const exisitedUser = userRepo.exists({where : {id : userId}});
        if(!exisitedUser) throw new BadRequestException(failedResponse('invalid User'))
        const member = memberRepo.create({chatId : groupId, memberId: userId});
        await memberRepo.save(member);

      // create other users as members of this group
      for (const id  of memberIds) {
        const exisitedUser = userRepo.exists({where : {id}});
        if(!exisitedUser) throw new BadRequestException(failedResponse('invalid User'))
        const member = memberRepo.create({chatId : groupId, memberId: id});
        await memberRepo.save(member);
      }
      return savedGroup
    })

    return await this.getChat(chat.id, userId);
  }

  async getChats(filterChatDto: FilterChatDto, userId: number) {
    const page = Number(filterChatDto.page ?? 1);
    const limit = Number(filterChatDto.limit ?? 10);

    const query = this.chatRepository.createQueryBuilder('chat');

    query.innerJoin(
      ChatMembers,
      'myMember',
      'myMember.chatId = chat.id and myMember.memberId = :userId',
      { userId: userId },
    );

    query.leftJoin(
      ChatMembers,
      'otherMember',
      `otherMember.chatId = chat.id AND otherMember.memberId != :userId 
      AND chat.type = :privateType `,
      {
        userId,
        privateType: ChatTypeEnum.PRIVATE,
      },
    );

    query.leftJoin(User, 'otherUser', `otherUser.id = otherMember.memberId`);

    if (filterChatDto.search) {
      query.andWhere(
        `
    (
      (
        chat.type = :privateType
        AND "otherUser".username ILIKE :search
      )
      OR
      (
        chat.type != :privateType
        AND chat.name ILIKE :search
      )
    )
    `,
        {
          privateType: ChatTypeEnum.PRIVATE,
          search: `%${filterChatDto.search}%`,
        },
      );
    }
    query
      .select('chat.id', 'id')
      .addSelect('chat.name', 'name')
      .addSelect(
        `
        CASE
            WHEN chat.type = :privateType
            THEN "otherUser".username
            ELSE chat.name
        END`,
        'name',
      )
      .addSelect(
        `
        CASE
            WHEN chat.type = :privateType
            THEN "otherUser".avatar
            ELSE chat."profileAvatar"
        END`,
        'profileAvatar',
      );

    const result = await query.getRawMany();
    return successResponse('Chat retrived successfully', result);
  }

  findAll() {
    return `This action returns all chat`;
  }

  async findOne(id: string) {
    return await this.chatRepository.findOneBy({ id });
  }

  async getChat(id: string, userId: number): Promise<ChatResponse> {
    const chat = await this.findOne(id);
    console.log(chat)
    if (!chat) throw new NotFoundException(failedResponse('Chat not found'));
    const chatMemberRepo = this.dataSource.getRepository(ChatMembers);
    const userRepo = this.dataSource.getRepository(User);

    const isMember = await chatMemberRepo.findOneBy({
      chatId: id,
      memberId: userId,
    });

    if (!isMember)
      throw new ForbiddenException(
        failedResponse("You can't access this resource"),
      );

    // group chat
    if (chat.type === ChatTypeEnum.GROUP) {
      return {
        ...chat,
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: 0,
      };
    }

    //private chat

    const otherMember = await chatMemberRepo.findOne({
      where: {
        chatId: id,
        memberId: Not(userId),
      },
    });

    if (!otherMember)
      throw new NotFoundException(failedResponse('Chat not found'));

    const user = await userRepo.findOne({
      where: { id: otherMember.memberId },
    });

    if (!user) throw new NotFoundException(failedResponse('user not found'));

    return {
      ...chat,
      name: user.username,
      profileAvatar: user.avatar,
      lastMessage: null,
      lastMessageTime: null,
      unreadCount: 0,
    };
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
