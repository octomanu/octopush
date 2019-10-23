import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createOrFind(user: Partial<User>): Promise<User> {
    return this.userRepository
      .find({ where: { octopusId: user.octopusId, take: 1 } })
      .then(userDb => {
        if (userDb.length > 0) {
          return userDb[0];
        } else {
          return this.userRepository.create(user);
        }
      });
  }
}
