import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({nullable: true})
    age: number;

    @Column({nullable: true})
    gender: string;


}