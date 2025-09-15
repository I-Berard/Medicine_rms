import { Controller } from '@nestjs/common';
import { AuthService, LoginData, SingUpData } from './auth.service';
import { Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() data: LoginData){
        const response = await this.authService.login(data);

        return {
            response,
            message: "Successfully logged in" 
        }
    }

    @Post()
    async signup(@Body() data: SingUpData){
        const response = await this.authService.signup(data)

        return {
            response,
            message: "User created successfully"
        }
    }

}
