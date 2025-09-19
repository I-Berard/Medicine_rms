import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller("users")
export class UserController {
    constructor( private readonly userService: UserService){}

    @Post()
    createUser(@Body() body: {name: string, email: string, password: string}){
        return this.userService.createUser(body.name, body.email, body.password);
    }

    @Get()
    findAll(){
        return this.userService.findAll()
    }

    @Get(":id")
    findOne(@Param('id') id: number){
        return this.userService.findOne(Number(id));
    }

    @Patch(":id")
    updateUser(@Param('id') id: number, @Body() updateData: Partial<User>){
        return this.userService.updateUser(id, updateData)
    }

    @Patch(":id/verify")
    verifyEmail(@Param("id") id: number, @Body() email: string){
        return this.userService.verifyEmail(id);
    }
}