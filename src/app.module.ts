import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloEntity } from './entities/hello.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'pguser',
            password: 'pgpass',
            database: 'pgdb',
            entities: [HelloEntity],
            synchronize: true,
        }),
      TypeOrmModule.forFeature([HelloEntity]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
