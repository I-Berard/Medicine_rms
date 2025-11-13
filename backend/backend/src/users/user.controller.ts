import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller("users")
export class UserController {
    constructor( private readonly userService: UserService){}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    createUser(@Body() body: {name: string, email: string, password: string}){
        return this.userService.createUser(body.name, body.email, body.password);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    findAll(){
        return this.userService.findAll()
    }

    @Get(":id")
    @ApiOperation({ summary: 'Get user by ID' })
    findOne(@Param('id') id: number){
        return this.userService.findOne(Number(id));
    }

    @Patch(":id")
    @ApiOperation({ summary: 'Update user by ID' })
    updateUser(@Param('id') id: number, @Body() updateData: Partial<User>){
        return this.userService.updateUser(id, updateData)
    }

    @Patch(":id/verify")
    @ApiOperation({ summary: 'Verify user email' })
    verifyEmail(@Param("id") id: number, @Body() email: string){
        return this.userService.verifyEmail(id);
    }
}