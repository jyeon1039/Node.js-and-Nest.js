import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}

export class updateUserDto extends PartialType(CreateUserDto) {}