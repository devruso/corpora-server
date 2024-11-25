import { IsString } from "class-validator";

export class IdParamDto {
    @IsString()
    id: number
}