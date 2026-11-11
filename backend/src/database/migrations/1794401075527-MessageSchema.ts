import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MessageSchema1794401075527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                            new Table({
                                name : 'messages',
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
                                        name : 'senderId',
                                        type : 'integer',
                                    },
                                    {
                                        name : 'text',
                                        type : 'text',
                                    },
                                    {
                                        name : 'createdAt',
                                        type : 'timestamp',
                                        default: "now()"
                                    },
                                    {
                                        name : 'updatedAt',
                                        type : 'timestamp',
                                        default: "now()"
                                    }
                                ],
                                foreignKeys : [
                                    new TableForeignKey({
                                        name : 'fk_message_user',
                                        columnNames: ['senderId'],
                                        referencedColumnNames: ['id'],
                                        referencedTableName: 'users',
                                    }),
                                    new TableForeignKey({
                                        name : 'fk_message_chat',
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
        await queryRunner.dropForeignKey('messages', 'fk_message_user')
        await queryRunner.dropForeignKey('messages', 'fk_message_chat')
        await queryRunner.dropTable('messages')
    }

}
