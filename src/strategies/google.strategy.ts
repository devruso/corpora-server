import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "src/auth/auth.service";
import googleOauthConfig from "src/config/google-oauth.config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(
    @Inject(googleOauthConfig.KEY) 
            private googleConfiguration:ConfigType<typeof googleOauthConfig>,
            private authService: AuthService
        ){
        super({
            clientID: googleConfiguration.clientID,
            clientSecret: googleConfiguration.clientSecret,
            callbackURL: googleConfiguration.callbackURL,
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken:string, refreshToken:string, profile:any, 
        done: VerifyCallback){
            const user = await this.authService.validateGoogleUser({
                email: profile.emails[0].value,
                username: profile.name.givenName,
                password: "",
            });
            done(null, user);
        }
}