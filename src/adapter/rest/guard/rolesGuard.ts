
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const ROLES = ['CUSTOMER', 'ADMIN', 'GUEST'];
    const userInfo = context.switchToHttp().getRequest().body.user;

    if(!userInfo.roles || !ROLES.includes(userInfo.roles)) {
        throw new ForbiddenException('Unauthorized role');
    }

    if(userInfo.roles === 'GUEST') {
        throw new ForbiddenException('Unauthorized to access this resource');
    }

    return true;
  }
}
