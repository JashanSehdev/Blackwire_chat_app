import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request & { user: any }, res: Response, next: NextFunction) {
    const token = this.extractTokenFromCookie(req);

    if (!token) {
      return next(new UnauthorizedException('Token not found'));
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      req['user'] = payload;
      next();
    } catch (error) {
      console.error(error)
      return next(new UnauthorizedException('Invalid or expired token'));
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }
}
