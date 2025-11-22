import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { AudioRepository } from './audio.repository';

@Module({
  controllers: [AudioController],
  providers: [AudioService, AudioRepository],
  exports: [AudioService],
})
export class AudioModule {}
