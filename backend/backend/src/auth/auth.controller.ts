import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService, LoginData, SingUpData } from './auth.service';
import { Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    @HttpCode(200)
    async login(@Body() data: LoginData){
        const response = await this.authService.login(data);

        return {
            response,
            message: "Success" 
        }
    }

    @Post('signup')
    async signup(@Body() data: SingUpData){
        const response = await this.authService.signup(data)

        return {
            response,
            // message: "User created successfully"
        }
    }

}
