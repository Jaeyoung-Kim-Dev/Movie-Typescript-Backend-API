import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() //Checks if given value is empty (=== null, === undefined) and if so, ignores all the validators on the property.
  @IsString({ each: true })
  readonly genres: string[];
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
// PartialType make values as optional in the other DTO.
// The above code is the same with the below.

// export class UpdateMovieDto {
// @IsString()
// readonly title?: string;

// @IsNumber()
// readonly year?: number;

// @IsString({ each: true })
// readonly genres?: string[];
// }
