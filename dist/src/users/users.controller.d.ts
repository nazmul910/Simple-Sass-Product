import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    me(auth: string): Promise<{
        id: string;
        email: string;
        password: string;
        tenantId: string;
        plan: import("../../generated/prisma/enums").PlanType;
        stripeSessionId: string | null;
        planExpiry: Date | null;
        role: import("../../generated/prisma/enums").Role;
    } | null>;
    all(auth: string): Promise<{
        id: string;
        email: string;
        password: string;
        tenantId: string;
        plan: import("../../generated/prisma/enums").PlanType;
        stripeSessionId: string | null;
        planExpiry: Date | null;
        role: import("../../generated/prisma/enums").Role;
    }[]>;
}
