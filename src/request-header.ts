import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export const RequestHeader = createParamDecorator(async(targetDto: any, ctx: ExecutionContext)=>{
    const request = ctx.switchToHttp().getRequest().headers;
    const dto = plainToInstance(targetDto, request,{
        excludeExtraneousValues: true
    });
    await validateOrReject(dto);
    return dto;
})