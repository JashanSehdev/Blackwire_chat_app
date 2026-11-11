import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/users.entity.js";
import { Chat } from "../../chat/entities/chat.entity.js";

@Entity('messages')
export class Message {

    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({type : 'uuid'})
    chatId : string

    @Column({type : 'integer'})
    senderId : number

    @Column({type : 'text'})
    text : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @ManyToOne(() => User, (user) => user.SentMessage)
    @JoinColumn({name : 'senderId'})
    Sender : Relation <User>

    @ManyToOne(() => Chat, (chat) => chat.Messages)
    @JoinColumn({name : 'chatId'})
    Chat : Relation <Chat>
}
