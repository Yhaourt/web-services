import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {StudentService} from '../services/student.service';
import {StudentDto} from '../dtos/student.dto';
import {EnrollmentService} from "../services/enrollment.service";

@Controller('students')
export class StudentController {
    constructor(
        private readonly studentService: StudentService,
        private readonly enrollmentService: EnrollmentService,
    ) {
    }

    @Get()
    async findAll() {
        return this.studentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    @Post()
    async create(@Body() studentDto: StudentDto) {
        return this.studentService.create(studentDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() studentDto: StudentDto) {
        return this.studentService.update(id, studentDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.studentService.delete(id);
    }

    @Post(':id/courses/:courseId')
    async enrollInCourse(@Param('id') studentId: string, @Param('courseId') courseId: string) {
        return this.enrollmentService.create(studentId, courseId);
    }

    @Delete(':id/courses/:courseId')
    async unenrollFromCourse(@Param('id') studentId: string, @Param('courseId') courseId: string) {
        return this.enrollmentService.delete(studentId, courseId);
    }
}