import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatMembersService } from './chat_members.service.js';
import { CreateChatMemberDto } from './dto/create-chat_member.dto.js';
import { UpdateChatMemberDto } from './dto/update-chat_member.dto.js';

@Controller('chat-members')
export class ChatMembersController {
  constructor(private readonly chatMembersService: ChatMembersService) {}

  @Post()
  create(@Body() createChatMemberDto: CreateChatMemberDto) {
    return this.chatMembersService.create(createChatMemberDto);
  }

  @Get()
  findAll() {
    return this.chatMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatMemberDto: UpdateChatMemberDto) {
    return this.chatMembersService.update(+id, updateChatMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatMembersService.remove(+id);
  }
}
