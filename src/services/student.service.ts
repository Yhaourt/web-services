import {Injectable} from '@nestjs/common';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {StudentEntity} from '../entities/student.entity';
import {StudentDto} from '../dtos/student.dto';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private readonly studentRepository: Repository<StudentEntity>,
    ) {
    }

    async findAll(): Promise<StudentEntity[]> {
        return this.studentRepository.find({
            relations: ['enrollments.course'],
        });
    }

    async findOne(id: string): Promise<StudentEntity | null> {
        return this.studentRepository.findOne({
            where: {id},
            relations: ['enrollments.course'],
        });
    }

    async create(studentData: StudentDto): Promise<StudentEntity> {
        const student = this.studentRepository.create(studentData);
        return this.studentRepository.save(student);
    }

    async update(id: string, updateData: StudentDto): Promise<UpdateResult> {
        return this.studentRepository.update(id, updateData);
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.studentRepository.delete(id);
    }
}