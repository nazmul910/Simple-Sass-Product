import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class PlanGuard implements CanActivate {
    private requiredPlan;
    constructor(requiredPlan: string);
    canActivate(context: ExecutionContext): boolean;
}
