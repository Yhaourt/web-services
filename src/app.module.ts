import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CourseEntity} from "./entities/course.entity";
import {StudentEntity} from "./entities/student.entity";
import {EnrollmentEntity} from "./entities/enrollment.entity";
import {StudentController} from "./controllers/student.controller";
import {CourseController} from "./controllers/course.controller";
import {StudentService} from "./services/student.service";
import {CourseService} from "./services/course.service";
import {EnrollmentService} from "./services/enrollment.service";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./controllers/auth.controller";
import {jwtConstants} from "./auth/constants";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConstants.access,
            signOptions: {expiresIn: '60s'},
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'pguser',
            password: 'pgpass',
            database: 'pgdb',
            entities: [CourseEntity, StudentEntity, EnrollmentEntity],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([CourseEntity, StudentEntity, EnrollmentEntity]),
    ],
    controllers: [StudentController, CourseController, AuthController],
    providers: [StudentService, CourseService, EnrollmentService],
})
export class AppModule {
}
