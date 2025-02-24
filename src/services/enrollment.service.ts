import {Injectable} from '@nestjs/common';
import {DeleteResult, Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {EnrollmentEntity} from '../entities/enrollment.entity';
import {StudentEntity} from "../entities/student.entity";
import {CourseEntity} from "../entities/course.entity";

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(EnrollmentEntity)
        private readonly enrollmentRepository: Repository<EnrollmentEntity>,
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) {
    }

    async create(studentId: string, courseId: string): Promise<EnrollmentEntity> {
        const student = await this.studentRepository.findOne({where: {id: studentId}});
        const course = await this.courseRepository.findOne({where: {id: courseId}});

        const enrollment = this.enrollmentRepository.create({
            student: student,
            course: course,
            enrollmentDate: new Date(),
        });

        return this.enrollmentRepository.save(enrollment);
    }

    async delete(studentId: string, courseId: string): Promise<DeleteResult> {
        return this.enrollmentRepository.delete({student: {id: studentId}, course: {id: courseId}});
    }
}
