import { Controller, Get, HttpCode, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth/google-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './guard/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './guard/roles/roles.guard';
import { CreateUserDto } from 'src/user/dto/create-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    return this.authService.login(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req){
    return this.authService.refreshToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signOut(@Request() req) {
    return this.authService.signOut(req.user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('users/all')
  async getAllUsers(){
    return this.authService.getAllUsers();
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){

  }

  @UseGuards(GoogleAuthGuard)
  async validateGoogleUser(googleUser: CreateUserDto){
    return this.authService.validateGoogleUser(googleUser);
  }

  @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res){
      const response = await this.authService.login(req.user.id);
      res.redirect(`http://localhost:3001/google/callback?token=${response.accessToken}`);
    }
}
