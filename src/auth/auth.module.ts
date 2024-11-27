import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from 'src/config/google-oauth.config';
import { User } from 'src/typeOrm/User';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './jwt/jwt.config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync(jwtConfig.asProvider()),
  ConfigModule.forFeature(googleOauthConfig),
  UserModule
],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
