import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException('User not found.');

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new UnauthorizedException('Invalid credentials.');

        return {id: user.id}
    }

    login(userID: number){
        const payload: AuthJwtPayload = {sub: userID};
        return this.jwtService.sign(payload);   
    }

    googleCallback(){

    }

    googleLogin(){

    }

    async validateGoogleUser(googleUser: CreateUserDto){
        const user = await this.userService.findByEmail(googleUser.email);
        if(user) return user;
        return await this.userService.create(googleUser);
    }
}
