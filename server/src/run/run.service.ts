import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Run } from './models/run.model';
import { CreateRunDto } from './dtos/createRun.dto';

@Injectable()
export class RunService {
  constructor(@InjectModel(Run) private runRepo: typeof Run,) {}

  async create(dto: CreateRunDto) {
    try {
      const run = await this.runRepo.create(dto);
      return run;
    } catch (error) {
      throw new InternalServerErrorException('Error creating run');
    }
  }

  async getAll() {
    try {
      const run = await this.runRepo.findAll();
      if (!run) {
        throw new NotFoundException('Runs not found');
      }
      return run;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching run');
    }
  }
  
  async getByUserId(userId: number) {
    try {
      const run = await this.runRepo.findAll({ where: { userId } });
      if (!run) {
        throw new NotFoundException('Run not found');
      }
      return run;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching run');
    }
  }
  
  async update(id: number, dto: CreateRunDto) {
    try {
      const [updatedCount, [updatedRun]] = await this.runRepo.update(dto, {
        where: { id },
        returning: true,
      });
      if (updatedCount === 0) {
        throw new NotFoundException('Run not found');
      }
      return updatedRun;
    } catch (error) {
      throw new InternalServerErrorException('Error updating run');
    }
  }
  
  async delete(id: number) {
    try {
      const deletedCount = await this.runRepo.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new NotFoundException('Run not found');
      }
      return deletedCount;
    } catch (error) {
      throw new InternalServerErrorException('Error deleting run');
    }
  }
}
