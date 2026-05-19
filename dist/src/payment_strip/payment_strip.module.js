"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStripModule = void 0;
const common_1 = require("@nestjs/common");
const payment_strip_controller_1 = require("./payment_strip.controller");
const payment_strip_service_1 = require("./payment_strip.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PaymentStripModule = class PaymentStripModule {
};
exports.PaymentStripModule = PaymentStripModule;
exports.PaymentStripModule = PaymentStripModule = __decorate([
    (0, common_1.Module)({
        providers: [payment_strip_service_1.PaymentStripService, prisma_service_1.PrismaService],
        controllers: [payment_strip_controller_1.PaymentStripController]
    })
], PaymentStripModule);
//# sourceMappingURL=payment_strip.module.js.map