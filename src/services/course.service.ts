import {Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CourseEntity} from '../entities/course.entity';
import {CourseDto} from '../dtos/course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private readonly courseRepository: Repository<CourseEntity>,
    ) {
    }

    async findAll(): Promise<CourseEntity[]> {
        return this.courseRepository.find({
            relations: ['enrollments.student'],
        });
    }

    async findOne(id: string): Promise<CourseEntity | null> {
        return this.courseRepository.findOne({
            where: {id},
            relations: ['enrollments.student'],
        });
    }

    async create(courseData: CourseDto): Promise<CourseEntity> {
        const course = this.courseRepository.create(courseData);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateData: CourseDto): Promise<UpdateResult> {
        return this.courseRepository.update(id, updateData);
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.courseRepository.delete(id);
    }
}