import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @ApiOperation({ summary: "get runs by user id" })
  @ApiResponse({ status: 200, type: [Run] })
  @Get('/:userId')
  getByUserId(@Param('userId') userId: number) {
    return this.runService.getByUserId(userId)
  }

  @ApiOperation({ summary: "update run" })
  @ApiResponse({ status: 201, type: [Run] })
  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: CreateRunDto) {
    return this.runService.update(id, dto)
  }

  @ApiOperation({ summary: "delete run" })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.runService.delete(id)
  }
}
