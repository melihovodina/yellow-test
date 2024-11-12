import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateRunDto {
    @ApiProperty({ example: 10.45, description: 'run distance in km' })
    @IsNumber({}, { message: 'distance must be a number' })
    @Min(0, { message: 'distance must be a positive number' })
    readonly distance: number;

    @ApiProperty({ example: '01:32:33', description: 'run time' })
    @IsString({ message: 'time must be a string' })
    @IsNotEmpty({ message: "time can't be empty" })
    readonly time: string;

    @ApiProperty({ example: '2024-11-11', description: 'run date' })
    @IsDateString({}, { message: "date must be a valid date string in format 'YYYY-MM-DD'" })
    readonly date: Date;

    @ApiProperty({ example: 1, description: 'runner id' })
    @IsInt({ message: 'user id must be an integer' })
    @Min(1, { message: 'user id must be a positive integer' })
    readonly userId: number;
}