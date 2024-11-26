import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/typeOrm/Company'; // Certifique-se de que o caminho está correto
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({where: {id}});
  }

   async create(body: CreateCompanyDto): Promise<Company> {
    const company = this.companyRepository.create(body);
    return this.companyRepository.save(company);
  }

  async update(id: number, body: UpdateCompanyDto): Promise<Company> {
    await this.companyRepository.update(id, body);
    return this.companyRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}