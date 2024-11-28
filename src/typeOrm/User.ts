import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";
import  * as bcrypt  from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'user_id',
    })
    id: number;

    @Column({
        nullable: false,
    })
    username: string;

    @Column({
        nullable: true,
    })
    hashedRefreshToken: string;

    @Column({
        nullable: false,
    })
    email: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        type:'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToMany(() => Company, company => company.user)
    companies: Company[];

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
}