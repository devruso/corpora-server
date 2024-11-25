import { Module, ValidationPipe } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { APP_PIPE } from '@nestjs/core';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
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
