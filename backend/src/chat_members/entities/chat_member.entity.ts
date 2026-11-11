import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,type Relation } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
import { Chat } from "../../chat/entities/chat.entity.js";

@Entity('chat_members')
export class ChatMembers {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: "integer"})
    memberId: number
    
    @Column({type : "uuid"})
    chatId : string

    @CreateDateColumn()
    createdAt : Date

    @ManyToOne(()=>User, (user) => user.ChatMemberShips)
    @JoinColumn({name : 'memberId'})
    Member : Relation<User>
    
    @ManyToOne(()=> Chat, (chat) => chat.Members)
    @JoinColumn({name : 'chatId'})
    Chat : Relation<Chat>
}
