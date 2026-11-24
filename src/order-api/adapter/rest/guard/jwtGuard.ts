
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request>();

    const jwt = request.headers.authorization?.split(' ');

    if(!jwt || jwt[0] !== 'Bearer' || !jwt[1]) {
      throw new UnauthorizedException('Invalid token');
    }
    
    
    const decodedJwt = await this.jwtService.verifyAsync(jwt[1]);

    if(!decodedJwt.sub || !decodedJwt.roles) {
        throw new UnauthorizedException('Invalid token');
    }
    
    request.body.user = decodedJwt;

    return true;
  }
}
