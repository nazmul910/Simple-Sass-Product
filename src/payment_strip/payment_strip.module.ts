import { Module } from '@nestjs/common';
import { PaymentStripController } from './payment_strip.controller';
import { PaymentStripService } from './payment_strip.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers:[PaymentStripService,PrismaService],
    controllers:[PaymentStripController]
})
export class PaymentStripModule {}
