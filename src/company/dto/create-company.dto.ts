import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    readonly name: string;
    @IsString()
    @Length(8, 40, {message: "Phone number must be between 8 and 40 characters"})
    readonly number: string;

}