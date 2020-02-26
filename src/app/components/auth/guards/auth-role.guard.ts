import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getClass());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.roles) {
      return this.matchRoles(roles, user.roles);
    }

    throw new HttpException(
      'You do not have permission (Roles)',
      HttpStatus.UNAUTHORIZED,
    );
  }

  matchRoles(roles: string[], userRoles: any): boolean {
    let hasRoles;

    userRoles.forEach(userRole => {
      hasRoles = roles.indexOf(userRole) >= 0;
    });

    return hasRoles;
  }
}
