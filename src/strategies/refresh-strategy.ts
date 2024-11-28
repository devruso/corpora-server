import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";
import refreshJwtConfig from "src/auth/jwt/refresh-jwt.config";
import { AuthJwtPayload } from "src/auth/types/auth-jwtPayload";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt'){
    constructor(@Inject(refreshJwtConfig.KEY) private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
                private authService : AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: refreshJwtConfiguration.secret,
            ignoreExpiration: false,
            passReqToCallback: true
        })
    }
 
    
    validate(req:Request ,payload: AuthJwtPayload){
        const refreshToken = req.get("authorization").replace("Bearer ", "").trim();
        const userId = payload.sub;
        return this.authService.validateRefreshToken(userId, refreshToken);
    }

}