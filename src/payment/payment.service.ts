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
    console.log('Creating payment with data:', { userId, amount, tran_id });
const paymentData = {
      store_id: process.env.STORE_ID,
      store_passwd: process.env.STORE_PASS,   
      total_amount: amount,
      currency: 'BDT',
      tran_id,


      //https://simple-sass-product.onrender.com/ https://outhouse-bulldog-jeep.ngrok-free.dev

      success_url: 'https://simple-sass-product.onrender.com/api/payment/success',
      fail_url: 'https://simple-sass-product.onrender.com/api/payment/fail',
      cancel_url: 'https://simple-sass-product.onrender.com/api/payment/cancel',

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

  console.log('=== PAYMENT SUCCESS CALLED ===');
  console.log('BODY:', JSON.stringify(body));

  const { amount, value_a } = body;

  console.log('value_a:', value_a);
  console.log('amount:', amount);
  console.log('amountNum:', Number(amount));

  const amountNum = Number(amount);

  let plan: PlanType = PlanType.FREE;
  let days = 0;

  if (amountNum === 10) {
    plan = PlanType.BASIC;
    days = 7;
  }
  else if (amountNum === 100) {
    plan = PlanType.STANDARD;
    days = 30;
  }
  else if (amountNum === 1000) {
    plan = PlanType.PREMIUM;
    days = 90;
  } else {
    console.log('NO PLAN MATCHED - amountNum was:', amountNum);
  }

   console.log('Plan selected:', plan, '| Days:', days);

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);

 try {
    const updated = await this.prisma.user.update({
      where: { id: value_a },
      data: { plan, planExpiry: expiry },
    });
    console.log('DB UPDATED:', updated.plan, updated.planExpiry);
  } catch (err) {
    console.error('DB UPDATE FAILED:', err);
  }

  return { message: 'Payment success' };
}

}
