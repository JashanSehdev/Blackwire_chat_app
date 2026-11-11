import { Controller, Get, Post, Body, Param, Res, Req } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login.dto.js';
import { GoogleAuthDto } from './dto/google.dto.js';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() registerUserDto: RegisterUserDto, @Res({passthrough: true}) response : Response) {
    console.log('request hit')
    const token = await this.authService.registerUser(registerUserDto);

    response.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }
  
  @Post('login')
  async loginUser(@Body() loginUserDto : LoginUserDto, @Res({passthrough: true}) response : Response) {
    const token = await this.authService.loginUser(loginUserDto);
    response.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Authentication successful' };
  }

  @Post("google")
  async googleLogin(@Body() googleAuthDto : GoogleAuthDto, @Res({passthrough: true}) response : Response){
    const token = await this.authService.googleAuth(googleAuthDto);

    response.cookie('access_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
     return { message: 'Authentication successful' };
  }
  

  // @Post('google')
  // async googleAuth(@Body() googleAuthDto : GoogleAuthDto, @Res({passthrough: true}) response : Response) {
  //   const token_data = await this.usersService.googleAuth(googleAuthDto)
  //   response.cookie('access_token', token_data.access_token, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     maxAge: 1 * 24 * 60 * 60 * 1000,
  //   });
  //   return "Authentication Successful"
  // }

  @Get('me')
  async getMe (@Req() req : Request & {user : any}){
    return  await this.authService.getMe(req.user.id);

  }

 @Get("logout")
logout(@Res({ passthrough: true }) res: Response) {
  res.clearCookie('access_token', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/', // Ensure path matches default cookie path
  });

  return { message: 'User successfully logout' };
}
  
}