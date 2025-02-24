import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EnrollmentEntity} from "./enrollment.entity";

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @OneToMany(() => EnrollmentEntity, enrollment => enrollment.course)
    enrollments: EnrollmentEntity[];
}