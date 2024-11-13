import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value)
    const errors = await validate(obj)
    const validationErrors: string[] = [];

    if (value.date && !/^\d{4}-\d{2}-\d{2}$/.test(value.date)) {
        validationErrors.push("date must be in format 'YYYY-MM-DD'");
    }

    if (value.time && !/^\d{2}:\d{2}:\d{2}$/.test(value.time)) {
      validationErrors.push("time must be in format 'HH:MM:SS'");
  }

    if (errors.length > 0) {
      errors.forEach(error => {
        const constraits = Object.values(error.constraints);
        validationErrors.push(`${error.property} ${constraits.join(', ')}`)
      })
    }

    if(validationErrors.length > 0) {
        throw new HttpException(validationErrors, HttpStatus.BAD_REQUEST)
    }

    return value
  }
}