import { Body, Controller, Post ,Res} from '@nestjs/common';
import { PaymentService } from './payment.service';
import type{ Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
 
  @Post()
  create(@Body() body: any) {
    return this.paymentService.createPayment(body.userId, body.amount);
  }


  // @Post('success')
  // success(@Body() body: any) {
  //   console.log('=== PAYMENT SUCCESS ENDPOINT CALLED ===');
  //   console.log('Received body:', JSON.stringify(body));
  //   console.log('Extracted amount:', body.amount);
  //   console.log('Extracted userId:', body.value_a);
  //   return this.paymentService.paymentSuccess(body);
  // }

  @Post('success')
  async success(@Body() body: any, @Res() res: Response) {
  console.log('=== PAYMENT SUCCESS ENDPOINT CALLED ===');
  await this.paymentService.paymentSuccess(body);

  return res.redirect('http://localhost:3000/payment/success');
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
