import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EnrollmentEntity} from "./enrollment.entity";

@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    registrationDate: Date;

    @OneToMany(() => EnrollmentEntity, enrollment => enrollment.student)
    enrollments: EnrollmentEntity[];
}