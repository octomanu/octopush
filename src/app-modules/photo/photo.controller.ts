import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhotoService } from './services/photo.service';
import { Photo } from './entities/photo.entity';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Post()
  create(@Body() data: CreatePhotoDto): Promise<Photo[]> {
    return this.photoService
      .create(data)
      .then(() => this.photoService.findAll());
    // return from(this.photoService.create(data)).pipe(
    //   switchMap(() => this.photoService.findAll()),
    // );
  }
}
