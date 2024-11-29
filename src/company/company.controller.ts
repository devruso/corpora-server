import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/typeOrm/Company';
import { Repository } from 'typeorm';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles/roles.guard';
import { UpdateCompanyDto } from './dto/update-company';

@Controller('company')
export class CompanyController {

    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        private readonly companyService: CompanyService
      ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll(@Query()paginationDTO:PaginationDTO) {
    return this.companyService.findAll(paginationDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: number, @Query() paginationDTO: PaginationDTO) {
    return this.companyService.findAllByUser(userId, paginationDTO);
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Post(':userId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Param('userId') userId: number, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(userId, createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.USER)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: number, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Roles(Role.USER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }

}
