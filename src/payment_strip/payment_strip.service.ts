import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PlanType } from 'generated/prisma/enums';
import Stripe from 'stripe';

type StripeClient = InstanceType<typeof Stripe>;

@Injectable()
export class PaymentStripService {
  private stripe: StripeClient;

  constructor(private prisma: PrismaService) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }
    this.stripe = new Stripe(stripeSecretKey);
  }

  async createPayment(userId: string, amount: number) {
    console.log(`Creating payment → userId: ${userId} | amount: ${amount}`);
    try {
      const session = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Subscription Plan' },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
          amount: String(amount),
        },
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      });

      return { gatewayURL: session.url };
    } catch (error) {
      console.error('Error creating Stripe payment:', error);
      throw new Error('Failed to create payment session');
    }
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    }


    let event;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      console.error(
        'Webhook signature verification failed:',
        error instanceof Error ? error.message : error,
      );
      throw new Error('Invalid webhook signature');
    }

    console.log(`Webhook event received: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      await this.fulfillOrder(event.data.object);
    }

    return { received: true };
  }

  private async fulfillOrder(session: any) {
    const { userId, amount } = session.metadata;

    if (!userId || !amount) {
      console.error('Missing metadata in session:', session.id);
      return;
    }

    const amountNum = Number(amount);

    let plan: PlanType = PlanType.FREE;
    let days = 0;

    if (amountNum === 10) {
      plan = PlanType.BASIC;
      days = 7;
    } else if (amountNum === 100) {
      plan = PlanType.STANDARD;
      days = 30;
    } else if (amountNum === 1000) {
      plan = PlanType.PREMIUM;
      days = 90;
    }

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);

    await this.prisma.user.update({
      where: { id: userId },
      data: { plan, planExpiry: expiry },
    });

    console.log(`Plan updated → userId: ${userId} | plan: ${plan} | expiry: ${expiry}`);
  }
}