import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { AppDataSource } from '../database/typeorm.config.js';
import { DataSource, EntityManager, In, Not, Repository } from 'typeorm';
import {
  ChatMembers
} from '../chat_members/entities/chat_member.entity.js';
import { Chat } from './entities/chat.entity.js';
import { failedResponse, successResponse } from '../common/utlis/responses.js';
import { ChatTypeEnum } from './enum/chat.enum.js';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatResponse } from './interfaces/chat.interface.js';
import { User } from '../users/entities/users.entity.js';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly dataSource: DataSource
  ) {}
  async create(createChatDto: CreateChatDto, userId: number) {
    const chat = await this.dataSource.transaction(
      async (manager: EntityManager) => {
        const memberRepo = manager.getRepository(ChatMembers);
        const chatRepo = manager.getRepository(Chat);

        if ((createChatDto.type === ChatTypeEnum.PRIVATE)) {
          const chatList = await memberRepo.find({
            relations: { Chat: true },
            where: { memberId: userId, Chat: { type: ChatTypeEnum.PRIVATE } },
            select: { memberId: true },
          });

          const chatIds = chatList.map(chat => chat.chatId);


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

  findAll() {
    return `This action returns all chat`;
  }

  async findOne(id: string) {
    return await this.chatRepository.findOneBy({ id });
  }

  async getChat(id: string, userId: number): Promise<ChatResponse> {
    const chat = await this.findOne(id);

    if (chat?.type === ChatTypeEnum.GROUP) {
      return {
        ...chat,
        lastMessage: null,
        lastMessageTime: null,
        unreadCount: 0,
      };
    }

    return  await this.dataSource.transaction(async (manager: EntityManager) => {
      // const chatRepo = manage.getRepository(Chat);
      const chatRepo = manager.getRepository(Chat)
      const chatMemberRepo = manager.getRepository(ChatMembers);
      const userRepo = manager.getRepository(User)
      
      const chat = await chatRepo.findOneBy({id});
      if (!chat) throw new NotFoundException(failedResponse('member not found'))

      const member = await chatMemberRepo.findOne({where: {chatId : id, memberId : Not(userId)}});
      if (!member) throw new NotFoundException(failedResponse('member not found'))
      const user = await userRepo.findOne({where : {id : member.memberId}});
      if (!user) throw new NotFoundException(failedResponse('user not found'))

      return {
        ...chat,
        name : user.username,
        profileAvatar : user.avatar,
        lastMessage : null,
        lastMessageTime : null,
        unreadCount : 0,
      }

    });
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
