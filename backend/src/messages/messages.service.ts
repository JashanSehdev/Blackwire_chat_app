import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { UpdateMessageDto } from './dto/update-message.dto.js';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity.js';
import { failedResponse, successResponse } from '../common/utlis/responses.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor (
    @InjectRepository(Message)
    private readonly messageRepository : Repository<Message>
  ) {}
  async create(createMessageDto: CreateMessageDto, userId : number, chatId: string) {
    const message = this.messageRepository.create({...createMessageDto, senderId: userId, chatId})
    const savedMessage = await this.messageRepository.save(message);
    return successResponse("Message created Successfullt",savedMessage)
  }

  async findAll() {
    return await this.messageRepository.find() 
  }

  async findOne(id: string) {
    return await this.messageRepository.findOneBy({id});
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageRepository.update(id, updateMessageDto);
    if (updatedMessage.affected !== 1) throw new InternalServerErrorException(failedResponse("unable to update message"));

    const message =  await this.findOne(id);
    return successResponse('message Updated Successfully', message);
  }

  async remove(id: string) {
    const deletedMessage = await this.messageRepository.delete(id);

    if (deletedMessage.affected !== 1) throw new InternalServerErrorException(failedResponse("unable to delete message"));

    return successResponse(`message deleted successfully with Id ${id}`, null)
  }
}
