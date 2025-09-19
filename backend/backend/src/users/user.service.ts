import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createUser(name: string, email: string, password: string){
        const user = this.userRepository.create({name: name, email: email, password: password});
        return this.userRepository.save(user);
    }

    async updateUser(id: number, info: Partial<User>){
        const user = await this.userRepository.findOne({ where: { id }});

        if(!user){
            throw new NotFoundException("User not found");
        }

        Object.assign(user, info);

        return this.userRepository.save(user);
    }

    async findAll(){
        return this.userRepository.find();
    }

    async findOne(id: number){ 
        const user = await this.userRepository.findOne({where: { id }});
        if (!user) throw new NotFoundException("User not found");

        return user;
    }

    async verifyEmail(id: number){
        const user = await this.userRepository.findOne({where: { id }});
        if (!user) throw new NotFoundException("User not found");

        user.isVerified = true;
        return this.userRepository.save(user);
    }
}
