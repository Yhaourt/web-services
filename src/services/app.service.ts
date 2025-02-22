import { Injectable } from '@nestjs/common';
import { HelloEntity } from '../entities/hello.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(HelloEntity)
    private readonly helloRepository: Repository<HelloEntity>
  ) {
  }

  getHello(): Promise<HelloEntity[]> {
    return this.helloRepository.find({});
  }
}
