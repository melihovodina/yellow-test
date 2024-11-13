import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { Image } from 'src/images/models/image.model';
import { Run } from 'src/run/models/run.model';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Run, Image]),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class UsersModule {}
