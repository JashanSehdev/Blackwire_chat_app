import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ChatService } from './chat.service.js';
import { CreateChatDto } from './dto/create-chat.dto.js';
import { UpdateChatDto } from './dto/update-chat.dto.js';
import { FilterChatDto } from './dto/filter-chat.dto.js';
import { CreateGroupDto } from './dto/create-group.dto.js';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req : Request & {user : any}) {
    
    return this.chatService.create(createChatDto, req.user.id);
  }

  @Post("group")
  createGroup(@Body() createGroupDto: CreateGroupDto, @Req() req : Request & {user : any}){
    return this.chatService.createGroup(createGroupDto, req.user.id)
  }

  @Get()
  findAll(@Query() filterChatDto : FilterChatDto ,@Req() req : Request & {user : any}) {
    return this.chatService.getChats(filterChatDto, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
