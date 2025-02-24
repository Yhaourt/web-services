import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {StudentService} from '../services/student.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(private readonly studentService: StudentService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const basicAuth = context.switchToHttp().getRequest().headers.authorization;
        if (!basicAuth) {
            return false;
        }
        const base64Enc = basicAuth.split(' ')[1];
        const base64Dec = atob(base64Enc);
        const [username, password] = base64Dec.split(':');
        const isValid = await this.studentService.authorize(username, password);

        if (!isValid) {
            throw new UnauthorizedException();
        }

        return true;
    }

}
