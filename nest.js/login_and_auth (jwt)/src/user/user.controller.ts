import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { CreateUserDto, updateUserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req){
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOneByUID(@Param('id') userUID: number){
        return this.userService.findOneByUID(userUID);
    }

    @Post()
    create(@Body() user: CreateUserDto){
        return this.userService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    update(@Param('id') userUID, @Body() user: updateUserDto){
        this.userService.update(userUID, user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    remove(@Param('id') userUID){
        this.userService.remove(userUID);
    }
}
