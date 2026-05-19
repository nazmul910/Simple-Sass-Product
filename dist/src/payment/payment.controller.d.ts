import { PaymentService } from './payment.service';
import type { Response } from 'express';
export declare class PaymentController {
    private paymentService;
    constructor(paymentService: PaymentService);
    create(body: any): Promise<{
        gatewayURL: any;
    }>;
    success(body: any, res: Response): Promise<void>;
    fail(): {
        message: string;
    };
    cancel(): {
        message: string;
    };
}
