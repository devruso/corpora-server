import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeOrm/User';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepository.update({id: userId}, {hashedRefreshToken:hashedRefreshToken})
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['companies'] });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
       where: { id },
       relations: ['companies'],
       select: ["id",'username', 'email',"companies", 'hashedRefreshToken', 'role'], 
      });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id }, relations: ['companies'] });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['companies'] });
  }
}