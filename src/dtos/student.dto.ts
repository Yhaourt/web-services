import {IsUUID, IsString, IsEmail, IsDate, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';

export class StudentDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsDate()
    @Type(() => Date)
    registrationDate: Date;
}