import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async getAll() {
    try {
      const users = await this.userRepo.findAll();

      if (!users || users.length === 0) {
        throw new NotFoundException('Users not found');
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({where: {email}});
      return user;
    } catch (error) {
      throw error
    }
  }

  async create(dto: CreateUserDto) {
    try {
      const user = await this.userRepo.create(dto)
      return user
    } catch (error) {
      throw error
    }
  }
}
