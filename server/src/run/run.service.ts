import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Run } from './models/run.model';
import { CreateRunDto } from './dtos/createRun.dto';

@Injectable()
export class RunService {
  constructor(@InjectModel(Run) private runRepo: typeof Run,) {}

  async create(dto: CreateRunDto) {
    const run = await this.runRepo.create(dto);
    return run
  }

  async getAll() {
    const runs = await this.runRepo.findAll();
    return runs
  }
}
