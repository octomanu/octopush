import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  findOneByOctoId(octopusId: number): Promise<User | null> {
    console.log("numero: ", octopusId)
    return this.userRepository
      .find({ where: { octopusId, take: 1 } }).then(userDb => {
        console.log("resultado: ", userDb);
        return userDb.length > 0 ? userDb[0] : null;
      });
  }

  createOrFind(user: Partial<User>): Promise<User> {
    return this.userRepository
      .find({ where: { octopusId: user.octopusId, take: 1 } })
      .then(userDb => {
        if (userDb.length > 0) {
          return userDb[0];
        } else {
          return this.createUser(user);
        }
      });
  }

  createUser(user: Partial<User>): Promise<User> {
    return this.userRepository.createQueryBuilder()
      .insert()
      .values(user)
      .execute()
      .then(result => {
        const userResult = { ...new User(), ...user, id: result.identifiers[0].id };
        return userResult;
      });
  }
}
