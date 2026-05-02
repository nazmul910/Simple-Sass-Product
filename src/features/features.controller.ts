import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { PlanGuard } from '../common/guards/plan.guard';

@Controller('features')
export class FeaturesController {

  @UseGuards(JwtGuard, new PlanGuard('BASIC'))
  @Get('feature1')
  feature1() {
    return { message: 'Basic feature unlocked' };
  }

  @UseGuards(JwtGuard, new PlanGuard('STANDARD'))
  @Get('feature2')
  feature2() {
    return { message: 'Standard feature unlocked' };
  }

  @UseGuards(JwtGuard, new PlanGuard('PREMIUM'))
  @Get('feature3')
  feature3() {
    return { message: 'Premium feature unlocked' };
  }
}