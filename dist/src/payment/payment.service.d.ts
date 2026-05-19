import { PrismaService } from "../prisma/prisma.service";
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(userId: string, amount: number): Promise<{
        gatewayURL: any;
    }>;
    paymentSuccess(body: any): Promise<{
        message: string;
    }>;
}
