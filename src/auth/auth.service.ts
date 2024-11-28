import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './jwt/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2'
import { CurrentUser } from './types/current-user';
@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
    ){}

    async getAllUsers(){
        return await this.userService.findAll();
    }

    async validateUser(email: string, password: string){
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException('User not found.');

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch) throw new UnauthorizedException('Invalid credentials.');

        return {id: user.id}
    }

    async login(userID: number){
        
        const {accessToken, refreshToken} = await this.generateTokens(userID);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userID, hashedRefreshToken);
        return ({
            id: userID,
            accessToken,
            refreshToken
        })
    }

    async generateTokens(userID: number){
        const payload: AuthJwtPayload = {sub: userID};
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])
         return{
            accessToken, 
            refreshToken
         }

    }

    async refreshToken(userID: number){
        const {accessToken, refreshToken} = await this.generateTokens(userID);
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.userService.updateHashedRefreshToken(userID, hashedRefreshToken);
        return{
            id: userID,
            accessToken,
            refreshToken
        }
    }

    async validateRefreshToken(userId:number, refreshToken:string){
        const user = await this.userService.findOne(userId);
        if(!user || !user.hashedRefreshToken) throw new UnauthorizedException('Invalid refresh token');

        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken);
        if(!refreshTokenMatches) throw new UnauthorizedException('Invalid refresh token');

        return {id: userId}
    }

    async signOut(userId: number){
        await this.userService.updateHashedRefreshToken(userId, null);
    }

    async validateJwtUser(userId: number){
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException('User not found');
        const currentUser: CurrentUser = {id: user.id, role: user.role}
        return currentUser;
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
