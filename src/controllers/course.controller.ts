import {Controller, Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import {CourseService} from '../services/course.service';
import {CourseEntity} from '../entities/course.entity';
import {CourseDto} from '../dtos/course.dto';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get()
    async findAll(): Promise<CourseEntity[]> {
        return this.courseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CourseEntity | null> {
        return this.courseService.findOne(id);
    }

    @Post()
    async create(@Body() courseData: CourseDto): Promise<CourseEntity> {
        return this.courseService.create(courseData);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateData: CourseDto) {
        return this.courseService.update(id, updateData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.courseService.delete(id);
    }
}