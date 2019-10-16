import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoController } from './photo.controller';
import { PhotoService } from './services/photo.service';
@Module({
  providers: [PhotoService],
  imports: [TypeOrmModule.forFeature([Photo])],
  controllers: [PhotoController],
})
export class PhotoModule {}
