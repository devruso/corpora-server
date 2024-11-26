import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/typeOrm/Company';
import { Repository } from 'typeorm';

@Controller('company')
export class CompanyController {

    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private readonly companyService: CompanyService
      ) {}
    
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Post(':userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Param('userId') userId: number, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(userId, createCompanyDto);
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
