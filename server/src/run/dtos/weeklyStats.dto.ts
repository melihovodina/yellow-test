import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, Min } from "class-validator";

export class WeeklyStatsDto {
    @ApiProperty({ example: '2024-11-11', description: 'run date' })
    @IsDateString({}, { message: "must be a valid date string in format 'YYYY-MM-DD'" })
    readonly date: string;

    @ApiProperty({ example: 1, description: 'runner id' })
    @IsInt({ message: 'must be an integer' })
    @Min(1, { message: 'must be a positive integer' })
    readonly userId: number;
}