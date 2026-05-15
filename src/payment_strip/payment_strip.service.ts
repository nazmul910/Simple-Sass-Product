import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentStripService {
    private stripe: Stripe ;
    constructor(private prisma: PrismaService){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
            apiVersion: '2024-06-20',
        })
    }

    async createPayment(userId:string,amount:number){
        try {
            const session = await this.stripe.checkout.sessions.create({
                mode: 'payment',
                line_items:[
                    {
                        price_data:{
                            currency:'usd',
                            product_data:{
                                name:'Subscription Plan',
                            },
                            unit_amount: amount * 100,
                        },
                        quantity:1,
                    }
                ],
                metadata:{
                    userId,
                    amount:String(amount),
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


    async handleWebhook(rawBody:Buffer,signature:string) {
        let event:Stripe.Event;

try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.error('Webhook signature failed:', error.message);
      throw new Error('Invalid webhook signature');
    }
    }


}
