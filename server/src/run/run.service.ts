import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Run } from './models/run.model';
import { CreateRunDto } from './dtos/createRun.dto';
import { Op } from 'sequelize'
import * as moment from 'moment';
import { WeeklyStatsDto } from './dtos/weeklyStats.dto';

@Injectable()
export class RunService {
  constructor(@InjectModel(Run) private runRepo: typeof Run,) {}

  async create(dto: CreateRunDto) {
    try {
      const run = await this.runRepo.create(dto);
      return run;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const runs= await this.runRepo.findAll();

      if (!runs || runs.length === 0) {
        throw new NotFoundException('Runs not found');
      }

      return runs;
    } catch (error) {
      throw error;
    }
  }
  
  async getByUserId(userId: number) {
    try {
      const runs = await this.runRepo.findAll({ where: { userId } });

      if (runs.length === 0) {
        throw new NotFoundException('Runs not found');
      }

      return runs;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async calcWeeklyStats(dto: WeeklyStatsDto) {
    try {
      const weekStartDate = moment(dto.date).startOf('isoWeek').format('YYYY-MM-DD');
      const weekEndDate = moment(dto.date).endOf('isoWeek').format('YYYY-MM-DD');

      const runs = await Run.findAll({
        where: {
          userId: dto.userId,
          date: {
            [Op.gte]: weekStartDate,
            [Op.lte]: weekEndDate,
          },
        },
      });

      if (runs.length === 0) {
        throw new NotFoundException('Runs not found');
      }

      const totalDistance = runs.reduce((sum, run) => sum + run.distance, 0);
      const totalTimeInSeconds = runs.reduce((sum, run) => {
        const [hours, minutes, seconds] = run.time.split(':').map(Number);
        return sum + (hours * 3600 + minutes * 60 + seconds);
      }, 0);

      const avgDistance = totalDistance / runs.length;
      const avgTimeInSeconds = totalTimeInSeconds / runs.length;
      const avgSpeed = (avgDistance / (avgTimeInSeconds / 3600)).toFixed(2);

      const avgHours = Math.floor(avgTimeInSeconds / 3600);
      const avgMinutes = Math.floor((avgTimeInSeconds % 3600) / 60);
      const avgSeconds = Math.floor(avgTimeInSeconds % 60);
      const avgTime = [
        String(avgHours).padStart(2, '0'),
        String(avgMinutes).padStart(2, '0'),
        String(avgSeconds).padStart(2, '0'),
      ].join(':');

      const weekString = `Week: (${weekStartDate} / ${weekEndDate})`;

      return {
        week: weekString,
        totalDistance,
        avgSpeed,
        avgTime,
      };
    } catch (error) {
      throw error;
    }
  }
}
