import { Controller, Get } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
  constructor(private service: GenerateurService) {}

  @Get('power')
  power() {
    return this.service.produire();
  }
}
