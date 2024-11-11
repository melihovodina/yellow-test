import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { RunController } from './run.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Run } from './models/run.model';

@Module({
  controllers: [RunController],
  providers: [RunService],
  imports: [
    SequelizeModule.forFeature([User, Run])
  ]
})
export class RunModule {}
