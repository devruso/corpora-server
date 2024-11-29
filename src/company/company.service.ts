import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/typeOrm/Company'; // Certifique-se de que o caminho está correto
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company';
import { User } from 'src/typeOrm/User';
import { PaginationDTO } from 'src/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  findAll(paginationDTO: PaginationDTO): Promise<Company[]> {
    return this.companyRepository.find({ 
      relations: ['user'],
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  findAllByUser(userId: number, paginationDTO: PaginationDTO): Promise<Company[]> {
    return this.companyRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE,
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        cnpj: true,
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ 
      where: { id }, 
      relations: ['user'],
      select: {
        id: true,
        name: true,
        user: {
          id: true,
          username: true,
         }
      }});
  }

  async create(userId: number, body: CreateCompanyDto): Promise<Company> {
    const user = await this.userRepository.findOne({
      where: 
      {id: userId},
      select: ['id', 'username', 'email', 'role'] 
    });
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