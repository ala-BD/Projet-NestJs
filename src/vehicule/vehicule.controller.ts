import { Controller, Get } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  constructor(private service: VehiculeService) {}

  @Get('operate')
  operate() {
    return this.service.operate();
  }
}
