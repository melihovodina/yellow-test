import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async getAll() {
    const users = await this.userRepo.findAll();
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.userRepo.findOne({where: {email}});
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto)
    return user
  }
}
