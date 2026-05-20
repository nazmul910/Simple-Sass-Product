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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStripController = void 0;
const common_1 = require("@nestjs/common");
const payment_strip_service_1 = require("./payment_strip.service");
let PaymentStripController = class PaymentStripController {
    paymentStripService;
    constructor(paymentStripService) {
        this.paymentStripService = paymentStripService;
    }
    async create(body) {
        return this.paymentStripService.createPayment(body.userId, body.amount);
    }
    async verifySession(sessionId) {
        return this.paymentStripService.verifyAndFulfill(sessionId);
    }
    async webhook(req, signature, res) {
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
        }
        catch (error) {
            console.error('Webhook processing error:', error);
            return res.status(400).send('Webhook error');
        }
    }
};
exports.PaymentStripController = PaymentStripController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentStripController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('verify-session'),
    __param(0, (0, common_1.Query)('session_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentStripController.prototype, "verifySession", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PaymentStripController.prototype, "webhook", null);
exports.PaymentStripController = PaymentStripController = __decorate([
    (0, common_1.Controller)('payment-strip'),
    __metadata("design:paramtypes", [payment_strip_service_1.PaymentStripService])
], PaymentStripController);
//# sourceMappingURL=payment_strip.controller.js.map