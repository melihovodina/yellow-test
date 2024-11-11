import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: 'email@gmail.com', description: 'user email'})
  @IsString({message: 'email should be a string'})
  @IsEmail({}, {message: "email should be valid"})
  readonly email: string;

  @ApiProperty({example: 'strongPassword123', description: 'user password'})
  @IsString({message: 'password should be a string'})
  @Length(8, 32, {message: "password should be above 8 and 32 chars"})
  readonly password: string;
}