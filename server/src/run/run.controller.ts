import { Body, Controller, Get, Post } from '@nestjs/common';
import { RunService } from './run.service';
import { CreateRunDto } from './dtos/createRun.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Run } from './models/run.model';

@Controller('run')
export class RunController {
  constructor(private readonly runService: RunService) {}

  @ApiOperation({ summary: "create new run" })
  @ApiResponse({ status: 201, type: Run })
  @Post()
  create(@Body() dto: CreateRunDto) {
    return this.runService.create(dto)
  }

  @ApiOperation({ summary: "get all runs" })
  @ApiResponse({ status: 200, type: [Run] })
  @Get()
  getAll() {
    return this.runService.getAll()
  }
}
