
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Scope } from '../decorators/scopes.decorator.js';
import { AuthContext } from './AuthContext.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const scopes = this.reflector.get(Scope, context.getHandler())
    const request = context
      .switchToHttp()
      .getRequest<AuthContext>();
    if (!scopes) {
      return true
    }

    const consumerScopes = request.auth.scopes.split(' ');
    return scopes.some(scope => consumerScopes.includes(scope))
  }
}
