import { PartialType } from '@nestjs/mapped-types';
import { CreateChatMemberDto } from './create-chat_member.dto.js';

export class UpdateChatMemberDto extends PartialType(CreateChatMemberDto) {}
