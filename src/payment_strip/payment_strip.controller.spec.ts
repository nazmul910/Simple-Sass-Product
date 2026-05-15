import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStripController } from './payment_strip.controller';

describe('PaymentStripController', () => {
  let controller: PaymentStripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentStripController],
    }).compile();

    controller = module.get<PaymentStripController>(PaymentStripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
