import { PrismaService } from "../prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        tenantId: string;
        plan: import("../../generated/prisma/enums").PlanType;
        planExpiry: Date | null;
        role: import("../../generated/prisma/enums").Role;
    } | null>;
    getUserByTenant(tenantId: string): Promise<{
        id: string;
        email: string;
        password: string;
        tenantId: string;
        plan: import("../../generated/prisma/enums").PlanType;
        planExpiry: Date | null;
        role: import("../../generated/prisma/enums").Role;
    }[]>;
}
