import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AuthModule, UsersModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
