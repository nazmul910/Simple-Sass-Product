import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { PaymentStripService } from './payment_strip.service';
import type { Request, Response } from 'express';

@Controller('payment-strip')
export class PaymentStripController {
    constructor(private paymentStripService: PaymentStripService){}


    @Post()
    async create(@Body() body:any){
        return this.paymentStripService.createPayment(body.userId, body.amount);
    }

    @Post('webhook')
    async webhook(
        @Req() req: Request & { rawBody: Buffer },
        @Headers('stripe-signature') signature: string,
        @Res() res: Response,
    ){
        try {
            const result = await this.paymentStripService.handleWebhook(
                req.rawBody,
                signature,
            );
            res.status(200).send('Webhook received');
        } catch (error) {
            console.error('Error handling webhook:', error);
            res.status(500).send('Error handling webhook');
        }
    }
}
