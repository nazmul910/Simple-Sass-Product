import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
 
  @Post()
  create(@Body() body: any) {
    return this.paymentService.createPayment(body.userId, body.amount);
  }


  @Post('success')
  success(@Body() body: any) {
    return this.paymentService.paymentSuccess(body);
  }

  @Post('fail')
  fail() {
    return { message: 'Payment failed' };
  }

  @Post('cancel')
  cancel() {
    return { message: 'Payment cancelled' };
  }
}
