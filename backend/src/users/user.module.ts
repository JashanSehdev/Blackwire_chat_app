import { Module } from '@nestjs/common';
import { UsersService } from './user.service.js';
import { UserControllers } from './user.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllers],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
