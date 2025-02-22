import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { HelloEntity } from '../entities/hello.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): Promise<HelloEntity[]> {
    return this.appService.getHello();
  }
}
