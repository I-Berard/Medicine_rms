import { Controller, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService} from './auth.service';
import { Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginData, SignUpData } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Successful login' })
    async login(@Body() data: LoginData){
        const response = await this.authService.login(data);

        return {
            response,
            message: "Success" 
        }
    }

    @Post('signup')
    @ApiOperation({ summary: 'User signup' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    async signup(@Body() data: SignUpData){
        const response = await this.authService.signup(data)

        return {
            response,
            // message: "User created successfully"
        }
    }

}
