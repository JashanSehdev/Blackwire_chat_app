import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/users.entity.js';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  Not,
  Repository,
} from 'typeorm';
import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDto } from '../users/dto/update-user-dto.js';
import { rmSync, stat } from 'fs';
import { GoogleAuthDto } from '../auth/dto/google.dto.js';
import { CreateUserInput, UserResponse } from './interfaces/user.interface.js';
import { FindUserDto } from './dto/find-user-dto.js';
import { paginationResponse } from '../common/utlis/responses.js';
import { FilterUserDto } from './dto/filter-user-dto.js';
import { ORDER, SORT } from '../common/enum/filter.enum.js';
import { Role } from './enum/roles.enum.js';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUser: CreateUserInput): Promise<UserResponse> {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async findUsers(userId: number, query: FilterUserDto) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);

    const where: FindOptionsWhere<User> = {};
    const order: FindOptionsOrder<User> = {};

    where.id = Not(userId);

    if (query.sortBy) {
      if (query.sortBy === SORT.NAME) {
        order.username = 'ASC';
      }
    } else if (query.sortBy) {
      if (query.sortBy === SORT.CREATEDAT) {
        order.createdAt = 'ASC';
      }
    } else if (query.sortBy) {
      if (query.sortBy === SORT.UPDATEDAT) {
        order.updatedAt =  'ASC';
      }
    }
    if (query.status) {
      where.status = query.status
    }

    if (query.orderBy) {
      order.createdAt = query.orderBy
    }

    if (query.search) {
      where.username = ILike(`%${query.search}%`);
    }

    if (query.role) {
      where.role = query.role
    }

    const [data, total] = await this.userRepository.findAndCount({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        status: true,
        createdAt: true
      },
      order,
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginationResponse(data, page, limit, total);
  }

  async createWithGoogle(createUser: GoogleAuthDto): Promise<UserResponse> {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<UserResponse | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        role: true,
        avatar: true,
      },
    });
  }

  async findOneSensitiveByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneByGoogleID(googleId: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ googleId });
    if (!user) return null;

    const { password, ...rest } = user;

    return rest;
  }

  async findOneByEmail(email: string): Promise<UserResponse | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneSensitiveByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async findAll(id: number): Promise<UserResponse[] | null> {
    return await this.userRepository.find();
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const user = await this.findOne(id);
    if (!user)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });

    const updatedUser = { ...user, ...updateUserDto };
    await this.userRepository.update(id, updatedUser);
    return updatedUser;
  }

  async delete(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    return this.userRepository.remove(user);
  }

  async changeAvatar(userId: number, avatar: string) {
    const user = this.findOne(userId);

    if (!user) throw new NotFoundException('User not found');

    const update = await this.userRepository.update(userId, { avatar });

    if (update.affected !== 1)
      throw new InternalServerErrorException('Failed to update User Avatar');

    return {
      success: true,
      data: { avatar },
    };
  }
}
