import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';


@Entity()
export class Company {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'company_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToOne(() => User, user => user.companies)
  user: User;
}