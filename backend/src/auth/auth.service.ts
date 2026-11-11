import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/user.service.js';
import { RegisterUserDto } from './dto/register.dto.js';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto.js';
import { GoogleAuthDto } from './dto/google.dto.js';
import { UserResponse } from '../users/interfaces/user.interface.js';
import { User } from '../users/entities/users.entity.js';
import { Status } from '../users/enum/status.enum.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<string> {
    let existingUser = await this.usersService.findOneByEmail(
      registerUserDto.email,
    );

    if(!existingUser) existingUser = await this.usersService.findOneSensitiveByUsername(
      registerUserDto.username
    )
    
    if (existingUser)
      throw new ConflictException({
        code: 'ALREADY_EXIST',
        message: 'user already exist',
      });

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }



    async loginUser(loginUserDto: LoginUserDto): Promise<string> {
    const {identifier} = loginUserDto
    let user : User | null = null;
    if (identifier.includes('@')){
      user = await this.usersService.findOneSensitiveByEmail(identifier)
    } else {
      user = await this.usersService.findOneSensitiveByUsername(identifier)
    }

    if (!user) {
      throw new NotFoundException({
        code: 'NOT_FOUND_EXCEPTION',
        message: 'user not found',
      });
    }

    if(user.status === Status.BLOCK) {
      throw new BadRequestException('You are Blocked By admin')
    }
    const isAuthenticated = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if(!isAuthenticated) throw new BadRequestException({code : 'INCORRECT_CREDENTIALS', message : 'email or password is Incorrect'});

    const payload = {id : user.id, email:user.email, username : user.username, role : user.role}

    return this.jwtService.sign(payload)
  }

  async googleAuth (googleDto : GoogleAuthDto) {
     let user = await this.usersService.findOneByGoogleID(googleDto.googleId)
     let payload = {}
     if (!user) {
        user = await this.usersService.findOneByEmail(googleDto.email) 
     }

     if (!user) {
      user  = await this.usersService.createWithGoogle(googleDto)
     }

     payload = { id : user.id, email : user.email, username : user.username, role : user.role}

     return await this.jwtService.sign(payload)
  }

  async getMe(id : number) : Promise<UserResponse | null> {
    const result =  await this.usersService.findOne(id);
    
    return result as UserResponse
  }
}
