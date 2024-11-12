import { ApiProperty } from '@nestjs/swagger';

export class WeeklyStats {
    @ApiProperty({ example: 'Week: (2024-11-11 / 2024-11-17)', description: 'week range' })
    week: string;

    @ApiProperty({ example: 30, description: 'total distance in km' })
    totalDistance: number;

    @ApiProperty({ example: 5.00, description: 'average speed in km/h' })
    avgSpeed: number;

    @ApiProperty({ example: '01:30:00', description: 'average time' })
    avgTime: string;
}