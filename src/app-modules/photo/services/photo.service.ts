import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Photo } from '../entities/photo.entity';
import { CreatePhotoDto } from '../dto/create-photo.dto';

@Injectable()
export class PhotoService {
  private readonly repo = getRepository(Photo);

  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  create(photo: CreatePhotoDto) {
    return this.photoRepository.save(photo);
  }
}
