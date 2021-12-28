import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserDto, updateUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get('/:id')
    findOneByUID(@Param('id') userUID: number){
        return this.userService.findOneByUID(userUID);
    }

    @Post()
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    @Patch('/:id')
    update(@Param('id') userUID, @Body() user: updateUserDto){
        this.userService.update(userUID, user);
    }
    
    @Delete('/:id')
    remove(@Param('id') userUID){
        this.userService.remove(userUID);
    }
}
