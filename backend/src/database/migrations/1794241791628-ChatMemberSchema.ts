import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ChatMembersSchema1794241791628 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name : 'chat_members',
                        columns:[
                            {
                                name : 'id',
                                type : 'uuid',
                                isGenerated : true,
                                generationStrategy : 'uuid',
                                isPrimary: true
                            },
                            {
                                name : 'chatId',
                                type : 'uuid',
                                
        
                            },
                            {
                                name : 'memberId',
                                type : 'integer',
                            },
                            {
                                name : 'createdAt',
                                type : 'timestamp',
                                default: "now()"
                            }
                        ],
                        foreignKeys : [
                            new TableForeignKey({
                                name : 'fk_member_user',
                                columnNames: ['memberId'],
                                referencedColumnNames: ['id'],
                                referencedTableName: 'users',
                            }),
                            new TableForeignKey({
                                name : 'fk_member_chat',
                                columnNames: ['chatId'],
                                referencedColumnNames: ['id'],
                                referencedTableName: 'chats',
                                onDelete : 'cascade'
                            })
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('chat_members', 'fk_member_user');
        await queryRunner.dropForeignKey('chat_members', 'fk_member_chat');

    }

}
