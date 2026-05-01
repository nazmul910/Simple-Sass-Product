import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { PlanType } from 'generated/prisma/enums';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
  ) {}

  createPayment(userId: string, amount: number) {
    const tran_id = uuid();

    return {
      gatewayURL: process.env.SSL_URL,
      payload: {
        store_id: process.env.STORE_ID,
        store_pass: process.env.STORE_PASS,
        total_amount: amount,
        currency: 'BDT',
        tran_id,
        success_url: 'http://localhost:3000/payment/success',
        fail_url: 'http://localhost:3000/payment/fail',
        cancel_url: 'http://localhost:3000/payment/cancel',
        value_a: userId,
      },
    };
  }


  async paymentSuccess(body:any){
    const {amount, value_a, tran_id} = body;
    let plan: PlanType = PlanType.FREE;
    
    if (amount == 10) plan = PlanType.BASIC;
    if (amount == 100) plan = PlanType.STANDARD;
    if (amount == 1000) plan = PlanType.PREMIUM;

    await this.prisma.user.update({
        where:{id: value_a},
        data:{plan},
    });

    return {message: "Payment successful, plan updated"};
  }



}
