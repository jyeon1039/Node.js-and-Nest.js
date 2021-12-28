import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    UID: number;

    @Column({default: ''})
    email: string;

    @Column({default: ''})
    password: string;
}