import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;
}
