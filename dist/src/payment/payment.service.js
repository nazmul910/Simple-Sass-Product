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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
const enums_1 = require("../../generated/prisma/enums");
const axios_1 = __importDefault(require("axios"));
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPayment(userId, amount) {
        const tran_id = (0, uuid_1.v4)();
        console.log('Creating payment with data:', { userId, amount, tran_id });
        const paymentData = {
            store_id: process.env.STORE_ID,
            store_passwd: process.env.STORE_PASS,
            total_amount: amount,
            currency: 'BDT',
            tran_id,
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
            const response = await axios_1.default.post(`${process.env.SSL_URL}/gwprocess/v4/api.php`, new URLSearchParams(paymentData).toString(), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            const gatewayURL = response.data.GatewayPageURL;
            if (!gatewayURL) {
                console.error('SSLCommerz response:', response.data);
                throw new common_1.InternalServerErrorException('Gateway URL not received');
            }
            return { gatewayURL };
        }
        catch (error) {
            console.error('Error creating payment:', error);
            throw new common_1.InternalServerErrorException('Failed to create payment');
        }
    }
    async paymentSuccess(body) {
        console.log('=== PAYMENT SUCCESS CALLED ===');
        console.log('BODY:', JSON.stringify(body));
        const { amount, value_a } = body;
        console.log('value_a:', value_a);
        console.log('amount:', amount);
        console.log('amountNum:', Number(amount));
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
        else {
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
        }
        catch (err) {
            console.error('DB UPDATE FAILED:', err);
        }
        return { message: 'Payment success' };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map