
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthenticationProvider } from '../providers/session-auth.provider.js';
import { AuthContext } from './AuthContext.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: AuthenticationProvider) {
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<AuthContext>();

    const jwt = request.headers.authorization?.split(' ');
    const env = process.env

    if (!jwt || jwt[0] !== 'Bearer' || !jwt[1]) {
      throw new UnauthorizedException('Unauthorized: Invalid token or not bearer token');
    }

    const decodedJwt = await this.jwtService.jwtVerify(jwt[1]);

    if (!decodedJwt.sub || decodedJwt.aud !== env.AUTH_AUDIENCE || decodedJwt.iss !== env.AUTH_DOMAIN) {
      throw new UnauthorizedException('Unauthorized: Invalid token claims');
    }

    request.auth = {
      scopes: typeof decodedJwt.scope === 'string' ? decodedJwt.scope : '',
      userId: decodedJwt.sub,
    };

    return true;

  }
}
