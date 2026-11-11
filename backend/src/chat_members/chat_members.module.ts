import { Module } from '@nestjs/common';
import { ChatMembersService } from './chat_members.service.js';
import { ChatMembersController } from './chat_members.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMembers } from './entities/chat_member.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMembers])],
  controllers: [ChatMembersController],
  providers: [ChatMembersService],
})
export class ChatMembersModule {}
