import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

class LoginData {
    email: string
    password: string
}

class LoginReturn {
    data: any;
    token: string;
}

class SingUpData {
    name: string
    email: string
    password: string
}

class SignUpReturn {
    message: string
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async login(data: LoginData): Promise<LoginReturn>{
        const user = await this.userRepository.findOne({where: {email: data.email}})
        if(!user) throw new NotFoundException("User not found, First login")
        
        if(data.password !== user.password){
            throw new UnauthorizedException("Password not correct") //This has to be changed because the error is incorrect
        }

        return {
            data: data,
            token: "fake-token"
        }
    }

    async signup(data: SingUpData): Promise<SignUpReturn>{
        const user = this.userRepository.create(data);

        return {
            message: "User created successfully"
        }
    }
    
}
