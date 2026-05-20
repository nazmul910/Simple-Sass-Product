import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    register(email: string, password: string): Promise<{
        message: string;
        user: {
            id: string;
            email: string;
            password: string;
            tenantId: string;
            plan: import("../../generated/prisma/enums").PlanType;
            stripeSessionId: string | null;
            planExpiry: Date | null;
            role: import("../../generated/prisma/enums").Role;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
        user: {
            id: string;
            email: string;
            password: string;
            tenantId: string;
            plan: import("../../generated/prisma/enums").PlanType;
            stripeSessionId: string | null;
            planExpiry: Date | null;
            role: import("../../generated/prisma/enums").Role;
        };
    }>;
}
