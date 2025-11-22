import { Controller, Get } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
  constructor(private service: PhareService) {}

  @Get('on')
  on() {
    return this.service.allumer();
  }
}
