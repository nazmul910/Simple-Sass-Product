import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [AuthModule, UsersModule, PaymentModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
