import { Module, ValidationPipe } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { APP_PIPE } from '@nestjs/core';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/typeOrm/Company';
import { User } from 'src/typeOrm/User';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([Company, User])],
  providers : [{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    })
  }, CompanyService]
})
export class CompanyModule {}
