import { Injectable, UnauthorizedException, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  constructor( 
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
        token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDto.email);

    if (!user) {
        throw new UnauthorizedException({ message: 'Wrong email or password' });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (passwordEquals) {
        return user;
    }

    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }

  async registration(userDto: CreateUserDto) {
    const cadidate = await this.usersService.getByEmail(userDto.email)

    if(cadidate) {
        throw new HttpException('That email is already in use', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.create({...userDto, password: hashPassword})

    return this.generateToken(user)
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async getUserId(authHeader: string) {
    try {
      const token = authHeader.split(' ')[1];
      const decodedToken = await this.jwtService.verify(token);
      return decodedToken.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
