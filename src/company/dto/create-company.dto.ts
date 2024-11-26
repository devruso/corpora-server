import { IsInt, IsPositive, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsInt({always: true})
    @IsPositive()
    readonly id: number;
    @IsString()
    readonly name: string;
    @IsString()
    @Length(8, 40, {message: "Phone number must be between 8 and 40 characters"})
    readonly number: string;

}