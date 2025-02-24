import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {StudentService} from "../services/student.service";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly studentService: StudentService,
        private readonly jwtService: JwtService,
    ) {
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const {email, password} = body;
        const isValidPassword = await this.studentService.authorize(email, password);
        if (!isValidPassword) {
            throw new HttpException('Invalid email or password', 401);
        }

        const access = this.jwtService.sign({email}, {
            expiresIn: '120s', secret: jwtConstants.access,
        });

        const refresh = this.jwtService.sign({email}, {
            expiresIn: '7d', secret: jwtConstants.refresh,
        });

        return {access, refresh};
    }

    @Post('refresh')
    async refresh(@Body() body: { refresh: string }) {
        const {refresh} = body;
        try {
            await this.jwtService.verifyAsync(refresh, {
                secret: jwtConstants.refresh,
            });
        } catch {
            throw new HttpException('Invalid refresh token', 401);
        }

        const {email} = this.jwtService.decode(refresh) as { email: string };
        const access = this.jwtService.sign({email}, {
            expiresIn: '120s', secret: jwtConstants.access,
        });

        const newRefresh = this.jwtService.sign({email}, {
            expiresIn: '7d', secret: jwtConstants.refresh,
        });

        return {access, newRefresh};
    }
}