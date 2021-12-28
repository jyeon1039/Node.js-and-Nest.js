import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, updateUserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(){
        const users = await this.userRepository.find();
        return users;
    }

    async create(user: CreateUserDto){
        const newUser = await this.userRepository.create(user);
        const { UID } = await this.userRepository.save(newUser);
        return UID;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({email});
        return user;
    }

    async findOneByUID(userUID: number){
        const user = await this.userRepository.findOne({UID: userUID});
        return user;
    }

    update(userUID: number, user: updateUserDto){
        this.userRepository
            .createQueryBuilder()
            .update(user)
            .where('UID = :userUID', {userUID})
            .execute();
    }

    remove(userUID: number){
        this.userRepository.delete(userUID);
    }
}
