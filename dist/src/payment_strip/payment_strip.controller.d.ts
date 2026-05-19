import type { RawBodyRequest } from '@nestjs/common';
import { PaymentStripService } from './payment_strip.service';
import type { Request, Response } from 'express';
export declare class PaymentStripController {
    private paymentStripService;
    constructor(paymentStripService: PaymentStripService);
    create(body: any): Promise<{
        gatewayURL: string | null;
    }>;
    webhook(req: RawBodyRequest<Request>, signature: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
