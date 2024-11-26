import { IsInt, IsPositive, IsString, Length, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsInt({ always: true })
  @IsPositive()
  @IsOptional()
  readonly id?: number;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @Length(8, 40, { message: 'Phone number must be between 8 and 40 characters' })
  @IsOptional()
  readonly number?: string;
}