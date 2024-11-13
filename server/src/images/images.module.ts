import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './models/image.model';
import { User } from 'src/users/models/user.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [
    SequelizeModule.forFeature([Image, User]),
    AuthModule
  ]
})
export class ImagesModule {}
