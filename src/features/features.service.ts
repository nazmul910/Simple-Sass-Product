import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  // Called after JwtGuard + PlanGuard('BASIC') already validated access
  async getFeature1(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return {
      message: 'Basic feature unlocked',
      unlockedFor: user?.email,
    };
  }

  // Called after JwtGuard + PlanGuard('STANDARD') already validated access
  async getFeature2(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return {
      message: 'Standard feature unlocked',
      unlockedFor: user?.email,
    };
  }

  // Called after JwtGuard + PlanGuard('PREMIUM') already validated access
  async getFeature3(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return {
      message: 'Premium feature unlocked',
      unlockedFor: user?.email,
    };
  }
}