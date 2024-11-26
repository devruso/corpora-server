import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/typeOrm/Company'; // Certifique-se de que o caminho está correto
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company';
import { User } from 'src/typeOrm/User';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async create(userId: number, body: CreateCompanyDto): Promise<Company> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const company = this.companyRepository.create({ ...body, user });
    return this.companyRepository.save(company);
  }

  async update(id: number, body: UpdateCompanyDto): Promise<Company> {
    await this.companyRepository.update(id, body);
    return this.companyRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.companyRepository.delete(id);
  }
}