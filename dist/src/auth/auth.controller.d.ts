import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            password: string;
            tenantId: string;
            plan: import("../../generated/prisma/enums").PlanType;
            planExpiry: Date | null;
            role: import("../../generated/prisma/enums").Role;
        };
    }>;
    login(body: any): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            password: string;
            tenantId: string;
            plan: import("../../generated/prisma/enums").PlanType;
            planExpiry: Date | null;
            role: import("../../generated/prisma/enums").Role;
        };
    }>;
}
