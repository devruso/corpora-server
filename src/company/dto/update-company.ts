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

  @IsString()
  @Length(8, 40, {message: "O número de telefone deve ter entre 8 e 40 caracteres"})
  @IsOptional()
  readonly phoneNumber?: string;

  @IsString()
  @Length(14, 14, {message: "O CNPJ deve ter 14 caracteres"})
  @IsOptional()
  readonly cnpj?: string;
}