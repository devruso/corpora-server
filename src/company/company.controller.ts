import { Body, Controller, Get, Headers, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { IdParamDto } from './dto/idParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from 'src/request-header';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    companyService: CompanyService;

    constructor(companyService: CompanyService){
        this.companyService = companyService;
    }
    
    @Get()
    findAll(){
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.companyService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, always: true}))
    create(@Body() body: CreateCompanyDto){
        return this.companyService.create(body);
    }

    @Patch(':id')
    update(@Param() param, 
            @Body() body: CreateCompanyDto,
            @RequestHeader(new ValidationPipe({validateCustomDecorators: true})) header: HeadersDto,
    ){
        return this.companyService.update(param, body, header);
    }

}
