import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class CreateImageDto {
    @ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
    readonly image: Express.Multer.File;

    @ApiProperty({ example: 1, description: 'author id' })
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt({ message: 'must be an integer' })
    @Min(1, { message: 'must be a positive integer' })
    readonly userId: number;
}