import { Medicine } from "src/medicine/medicine.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @OneToMany(() => Medicine, (medicine) => medicine.user)
    medicine: Medicine[];
}