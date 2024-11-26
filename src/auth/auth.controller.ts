import { Controller, Get, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google-auth/google-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req){
    const token = this.authService.login(req.user.id)
    return {id: req.user.id, token}
  }


  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin(){

  }

  @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    googleCallback(@Req() req){
      //const response = await this.authService.login(req.user.id)
    }
  
}
