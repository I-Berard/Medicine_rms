import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/user.service';


export class LoginData {
    email: string
    password: string
}

class LoginReturn {
    data: any;
    token: string;
    message: string;
}

export class SingUpData {
    name: string
    email: string
    password: string
}

class SignUpReturn {
    data: any
    token: string
    message: string
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private configService: ConfigService
    ){}

    async login(data: LoginData): Promise<LoginReturn>{
        const user = await this.userRepository.findOne({where: {email: data.email}})
        if(!user) throw new NotFoundException("User not found, First signup")
        
        if(data.password !== user.password){
            throw new UnauthorizedException("Password not correct") //This has to be changed because the error is incorrect
        }
        
        const {password, medicine, ...safeUser} = user;

        const secret = this.configService.get<string>('SECRET')!;
        const token = jwt.sign(safeUser, secret);

        return {
            data: safeUser,
            token: token,
            message: "Success"
        }
    }

    async signup(data: SingUpData): Promise<SignUpReturn>{
        const existingUser = await this.userRepository.findOne({
            where: {
                email: data.email
            }
        })

        if(existingUser) throw new BadRequestException("User already exists");

        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
        console.log(user);

        const {password, medicine, ...safeUser} = user;
        
        const secret = this.configService.get<string>("SECRET")!;
        const token = jwt.sign(safeUser, secret);

        return {
            data: safeUser,
            token: token,
            message: "User created successfully" //implement fallback if the user is already in the database
        }
    }
    
}
