import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { PlanGuard } from '../common/guards/plan.guard';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private featuresService: FeaturesService) {}

  @UseGuards(JwtGuard, new PlanGuard('BASIC'))
  @Get('Your Basic Feature is activated with your subscription')
  feature1(@Req() req: any) {
    return this.featuresService.getFeature1(req.user.userId);
  }

  @UseGuards(JwtGuard, new PlanGuard('STANDARD'))
  @Get('Your Standard Feature is activated with your subscription')
  feature2(@Req() req: any) {
    return this.featuresService.getFeature2(req.user.userId);
  }

  @UseGuards(JwtGuard, new PlanGuard('PREMIUM'))
  @Get('Your Premium Feature is activated with your subscription')
  feature3(@Req() req: any) {
    return this.featuresService.getFeature3(req.user.userId);
  }
}