import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,type Relation, UpdateDateColumn } from "typeorm";
import { Role } from "../enum/roles.enum.js";
import { Status } from "../enum/status.enum.js";
import { Chat } from "../../chat/entities/chat.entity.js";
import { ChatMembers } from "../../chat_members/entities/chat_member.entity.js";

@Entity('users')

export class User {
    
    @PrimaryGeneratedColumn()
    id : number

    @Column({type : 'varchar', length : 120})
    username : string

    @Column({type : 'varchar' ,length : 120, unique: true})
    email : string

    @Column({type: 'varchar', length : 120, nullable : true})
    password : string

    @Column({type : 'enum', enum : Role, default : Role.USER})
    role : Role

    @Column({type : 'varchar', length: 255, unique:true, nullable: true})
    googleId : string

    @Column({type : 'varchar', length:500, nullable : true})
    avatar : string

    @Column({type : 'enum', enum: Status, default: Status.ACTIVE})
    status : Status

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt : Date

    @OneToMany(()=>ChatMembers, (chatMembers) => chatMembers.Member)
    ChatMemberShips : Relation<ChatMembers[]>
}