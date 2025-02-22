import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class HelloEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}