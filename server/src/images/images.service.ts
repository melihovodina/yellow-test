import { Injectable, NotFoundException } from '@nestjs/common';
import { Image } from './models/image.model';
import * as uuid from "uuid"
import * as path from "path";
import * as fs from "fs";
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image) private imageRepo: typeof Image,
    private authService: AuthService
  ) {}

  async create(file: Express.Multer.File, authHeader:string): Promise<Image> {
    try {
      const fileExtension = path.extname(file.originalname)
      const fileName = uuid.v4() + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', 'uploads');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      const userId = await this.authService.getUserId(authHeader)
      const image = await this.imageRepo.create({
        filename: fileName,
        url: `/uploads/${fileName}`,
        userId: userId
      });
      
      return image;
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    try {
      const images = await this.imageRepo.findAll();

      if (!images || images.length === 0) {
        throw new NotFoundException('Images not found');
      }

      return images;
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId: number) {
    try {
      const images = await this.imageRepo.findAll({ where: { userId } });

      if (!images || images.length === 0) {
        throw new NotFoundException('Images not found');
      }

      return images;
    } catch (error) {
      throw error;
    }
  }
}
