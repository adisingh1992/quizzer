import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _jwtService: JwtService,
    private _reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), context.getClass()
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Access token not found');

    try {
      const jwtSecret: string = process.env.JWT_SECRET || "SECRET";

      const payload = await this._jwtService.verifyAsync(token, { secret: jwtSecret });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
