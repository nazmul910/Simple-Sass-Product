import { PrismaService } from "../prisma/prisma.service";
export declare class FeaturesService {
    private prisma;
    constructor(prisma: PrismaService);
    getFeature1(userId: string): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
    getFeature2(userId: string): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
    getFeature3(userId: string): Promise<{
        message: string;
        unlockedFor: string | undefined;
    }>;
}
