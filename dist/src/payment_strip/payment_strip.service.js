"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStripService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../../generated/prisma/enums");
const stripe_1 = __importDefault(require("stripe"));
let PaymentStripService = class PaymentStripService {
    prisma;
    stripe;
    constructor(prisma) {
        this.prisma = prisma;
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            throw new Error('Missing STRIPE_SECRET_KEY environment variable');
        }
        this.stripe = new stripe_1.default(stripeSecretKey);
    }
    async createPayment(userId, amount) {
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
        }
        catch (error) {
            console.error('Error creating Stripe payment:', error);
            throw new Error('Failed to create payment session');
        }
    }
    async handleWebhook(rawBody, signature) {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
            throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        }
        catch (error) {
            console.error('Webhook signature verification failed:', error instanceof Error ? error.message : error);
            throw new Error('Invalid webhook signature');
        }
        console.log(`Webhook event received: ${event.type}`);
        if (event.type === 'checkout.session.completed') {
            await this.fulfillOrder(event.data.object);
        }
        return { received: true };
    }
    async fulfillOrder(session) {
        const { userId, amount } = session.metadata;
        if (!userId || !amount) {
            console.error('Missing metadata in session:', session.id);
            return;
        }
        const amountNum = Number(amount);
        let plan = enums_1.PlanType.FREE;
        let days = 0;
        if (amountNum === 10) {
            plan = enums_1.PlanType.BASIC;
            days = 7;
        }
        else if (amountNum === 100) {
            plan = enums_1.PlanType.STANDARD;
            days = 30;
        }
        else if (amountNum === 1000) {
            plan = enums_1.PlanType.PREMIUM;
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
};
exports.PaymentStripService = PaymentStripService;
exports.PaymentStripService = PaymentStripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentStripService);
//# sourceMappingURL=payment_strip.service.js.map