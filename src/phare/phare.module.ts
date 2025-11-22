import { Module } from '@nestjs/common';
import { PhareService } from './phare.service';
import { PhareController } from './phare.controller';
import { PhareRepository } from './phare.repository';

@Module({
  controllers: [PhareController],
  providers: [PhareService, PhareRepository],
  exports: [PhareService],
})
export class PhareModule {}
