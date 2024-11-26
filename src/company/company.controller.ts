import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { IdParamDto } from './dto/idParam.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from 'src/request-header';
import { CompanyService } from './company.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/typeOrm/Company';
import { Repository } from 'typeorm';

@Controller('company')
export class CompanyController {
    companyService: CompanyService;

    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
      ) {}
    
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: number, @Body() updateCompanyDto: CreateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }

}
