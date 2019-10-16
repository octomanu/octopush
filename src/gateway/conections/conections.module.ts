import { Module } from '@nestjs/common';
import { ConectionService } from './services/conection/conection.service';

@Module({
  providers: [ConectionService],
  exports: [ConectionService],
})
export class ConectionsModule {}
