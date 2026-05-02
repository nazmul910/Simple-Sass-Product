import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from '../../auth/jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const auth = req.headers.authorization;
    if (!auth) throw new UnauthorizedException('No token');

    const token = auth.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded; 
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}