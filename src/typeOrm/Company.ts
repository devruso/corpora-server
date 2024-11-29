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

  @Column({
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    nullable: false,
    unique: true,
  })
  cnpj: string;

  @ManyToOne(() => User, user => user.companies, {nullable: false})
  user: User;
}