import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ChatsSchema1794241356023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name : 'chats',
                columns:[
                    {
                        name : 'id',
                        type : 'uuid',
                        isGenerated : true,
                        generationStrategy : 'uuid',
                        isPrimary: true
                    },
                    {
                        name : 'type',
                        type : 'enum',
                        enum : ['group', 'private'],
                        default : "'private'"

                    },
                    {
                        name : 'profileAvatar',
                        type : 'varchar',
                        length : "500",
                        isNullable : true
                    },
                    {
                        name : 'name',
                        type : 'varchar',
                        isNullable : true
                    },
                    {
                        name : 'createdAt',
                        type : 'timestamp',
                        default: "CURRENT_TIMESTAMP"
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('chats')
    }

}
