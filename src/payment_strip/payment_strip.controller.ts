import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Req,
  Res,

} from '@nestjs/common';
import  type {RawBodyRequest,} from '@nestjs/common';
import { PaymentStripService } from './payment_strip.service';
import type { Request, Response } from 'express';

@Controller('payment-strip')
export class PaymentStripController {
  constructor(private paymentStripService: PaymentStripService) {}

  @Post()
  async create(@Body() body: any) {
    return this.paymentStripService.createPayment(body.userId, body.amount);
  }

    @Get('verify-session')
  async verifySession(@Query('session_id') sessionId: string) {
    return this.paymentStripService.verifyAndFulfill(sessionId);
  }

  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
    @Res() res: Response,
  ) {
    console.log('=== Webhook Hit ===');
    console.log('Signature exists:', !!signature);
    console.log('Raw body exists:', !!req.rawBody);

    if (!req.rawBody) {
      console.error('Raw body is missing!');
      return res.status(400).send('Raw body missing');
    }

    if (!signature) {
      console.error('Stripe signature missing!');
      return res.status(400).send('Signature missing');
    }
    try {
      await this.paymentStripService.handleWebhook(req.rawBody, signature);
      return res.status(200).send('Webhook received');
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(400).send('Webhook error');
    }
  }
}
