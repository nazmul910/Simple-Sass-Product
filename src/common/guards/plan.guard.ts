import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(private requiredPlan: string) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user.plan) throw new ForbiddenException();

    const hierarchy = ['FREE', 'BASIC', 'STANDARD', 'PREMIUM'];

    const userLevel = hierarchy.indexOf(user.plan);
    const requiredLevel = hierarchy.indexOf(this.requiredPlan);

    if (userLevel < requiredLevel) {
      throw new ForbiddenException('Upgrade your plan');
    }

    return true;
  }
}