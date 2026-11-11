import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,type Relation } from "typeorm";
import { ChatTypeEnum } from "../enum/chat.enum.js";
import { ChatMembers } from "../../chat_members/entities/chat_member.entity.js";
import { Message } from "../../messages/entities/message.entity.js";

@Entity('chats')
export class Chat {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type : 'enum', enum : ChatTypeEnum})
    type : ChatTypeEnum

    @Column({type : 'varchar', length : 500, nullable :true})
    profileAvatar : string

    @Column({type : 'varchar', default : 'unkown'})
    name : string

    @CreateDateColumn()
    createdAt : Date

    @OneToMany(() => ChatMembers, (chatMembers) => chatMembers.Chat)
    Members: Relation<ChatMembers[]>

    @OneToMany(() => Message, (message) => message.Chat) 
    Messages: Relation<Message[]>
}
