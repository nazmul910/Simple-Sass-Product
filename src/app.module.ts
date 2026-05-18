import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { FeaturesModule } from './features/features.module';
import { PaymentStripService } from './payment_strip/payment_strip.service';
import { PaymentStripController } from './payment_strip/payment_strip.controller';
import { PaymentStripModule } from './payment_strip/payment_strip.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, UsersModule, PaymentModule, FeaturesModule, PaymentStripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
