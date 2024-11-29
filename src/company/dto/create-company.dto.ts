import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    readonly name: string;
    @IsString()
    @Length(8, 40, {message: "O número de telefone deve ter entre 8 e 40 caracteres"})
    readonly phoneNumber: string;
    @IsString()
    @Length(14, 14, {message: "O CNPJ deve ter 14 caracteres"})
    readonly cnpj: string;

}