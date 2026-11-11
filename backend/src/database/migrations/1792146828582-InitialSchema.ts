import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Role } from "../../users/enum/roles.enum.js";

export class InitialSchema1792146828582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name : 'users',
                columns : [
                    {
                        name : 'id',
                        type : 'integer',
                        isPrimary: true,
                        isGenerated : true,
                        generationStrategy: 'increment'
                    },
                    {
                        name : 'username',
                        type : 'varchar',
                        isNullable : false,
                        isUnique : true
                    },

                    {
                        name : 'email',
                        type : 'varchar',
                        isNullable : false,
                        isUnique : true,
                    },

                    {
                        name : 'password',
                        type : 'varchar',
                        isNullable : true,
                    },

                    {
                        name : 'role',
                        type : 'enum',
                        enum : ['admin', 'user'],
                        enumName : 'user_role_enum',
                        default: "'user'"
                    },
                    {
                        name : 'status',
                        type : 'enum',
                        enum : ['active', 'blocked'],
                        default: "'active'"
                    },

                    {
                        name : 'avatar',
                        type : 'varchar',
                        isNullable : true,
                    },

                    {
                        name : 'googleId',
                        type : 'varchar',
                        isNullable : true,
                        isUnique : true
                    },

                    {
                        name : 'createdAt',
                        type : 'timestamp',
                        default : 'CURRENT_TIMESTAMP'
                    }, 

                    {
                        name : 'updatedAt',
                        type : 'timestamp',
                        default : 'CURRENT_TIMESTAMP'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
