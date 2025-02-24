import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {StudentEntity} from "./student.entity";
import {CourseEntity} from "./course.entity";

@Entity('enrollment')
export class EnrollmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => StudentEntity, student => student.enrollments, {onDelete: 'CASCADE'})
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, course => course.enrollments, {onDelete: 'CASCADE'})
    course: CourseEntity;

    @Column()
    enrollmentDate: Date;
}