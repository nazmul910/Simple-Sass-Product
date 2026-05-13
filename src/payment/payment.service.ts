import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { PlanType } from 'generated/prisma/enums';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(
    private prisma: PrismaService,
  ) {}

async  createPayment(userId: string, amount: number) {
    const tran_id = uuid();

const paymentData = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASS,   
      total_amount: amount,
      currency: 'BDT',
      tran_id,

      success_url: 'http://localhost:3000/payment/success',
      fail_url: 'http://localhost:3000/payment/fail',
      cancel_url: 'http://localhost:3000/payment/cancel',

      cus_name: 'Customer',
      cus_email: 'customer@example.com',
      cus_phone: '01700000000',
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_country: 'Bangladesh',

      shipping_method: 'NO',
      product_name: 'Subscription Plan',
      product_category: 'General',
      product_profile: 'general',

      value_a: userId,
    };

    try {
      const response = await axios.post(
        `${process.env.SSL_URL}/gwprocess/v4/api.php`,
        new URLSearchParams(paymentData as any).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      const gatewayURL = response.data.GatewayPageURL;

      if (!gatewayURL) {
        console.error('SSLCommerz response:', response.data);
        throw new InternalServerErrorException('Gateway URL not received');
      }

      return { gatewayURL };  
    } catch (error) {
      console.error('Error creating payment:', error);
      throw new InternalServerErrorException('Failed to create payment');
    }
    }


  


async paymentSuccess(body: any) {
  const { amount, value_a } = body;

  const amountNum = Number(amount);

  let plan: PlanType = PlanType.FREE;
  let days = 0;

  if (amountNum === 10) {
    plan = PlanType.BASIC;
    days = 7;
  }
  if (amountNum === 100) {
    plan = PlanType.STANDARD;
    days = 30;
  }
  if (amountNum === 1000) {
    plan = PlanType.PREMIUM;
    days = 90;
  }

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);

  await this.prisma.user.update({
    where: { id: value_a },
    data: {
      plan,
      planExpiry: expiry,
    },
  });

  return { message: 'Payment success' };
}


}
