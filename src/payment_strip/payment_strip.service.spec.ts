import { Test, TestingModule } from '@nestjs/testing';
import { PaymentStripService } from './payment_strip.service';

describe('PaymentStripService', () => {
  let service: PaymentStripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentStripService],
    }).compile();

    service = module.get<PaymentStripService>(PaymentStripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
