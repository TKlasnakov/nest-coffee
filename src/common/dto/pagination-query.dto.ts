import { Transform } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  limit: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  offset: number;
}
