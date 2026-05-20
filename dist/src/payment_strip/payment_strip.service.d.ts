import { PrismaService } from "../prisma/prisma.service";
export declare class PaymentStripService {
    private prisma;
    private stripe;
    constructor(prisma: PrismaService);
    createPayment(userId: string, amount: number): Promise<{
        gatewayURL: string | null;
    }>;
    verifyAndFulfill(sessionId: string): Promise<{
        success: boolean;
        alreadyProcessed: boolean;
    } | {
        success: boolean;
        alreadyProcessed?: undefined;
    }>;
    handleWebhook(rawBody: Buffer, signature: string): Promise<{
        received: boolean;
    }>;
    private fulfillOrder;
}
