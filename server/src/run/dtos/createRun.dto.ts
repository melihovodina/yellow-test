import { ApiProperty } from "@nestjs/swagger";

export class CreateRunDto {
    @ApiProperty({example: 10.45, description: 'run distance in km'})
    readonly distance: number;

    @ApiProperty({example: '01:32:33', description: 'run time'})
    readonly time: string;

    @ApiProperty({example: '2024-11-11', description: 'run date'})
    readonly date: Date;

    @ApiProperty({example: 1, description: 'runner id'})
    readonly userId: number;
}