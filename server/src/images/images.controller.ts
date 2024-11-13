import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, Headers } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Image } from './models/image.model';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: "upload image" })
  @ApiResponse({ status: 201, type: Image })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() file: Express.Multer.File, @Headers('authorization') authHeader: string) {
    return this.imagesService.create(file, authHeader);
  }

  @ApiOperation({ summary: "get all images" })
  @ApiResponse({ status: 201, type: [Image] })
  @Get()
  getAll() {
    return this.imagesService.getAll();
  }

  @ApiOperation({ summary: "get images by user id" })
  @ApiResponse({ status: 201, type: [Image] })
  @Get(':id')
  getByUserId(@Param('id') id: number) {
    return this.imagesService.getByUserId(id);
  }
}
