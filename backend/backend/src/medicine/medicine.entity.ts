import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { Schedule } from "src/schedule/shedule.entity";

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  form: string; 

  @Column()
  description: string;

  @Column('simple-array')
  times_per_day: string[]; 

  @ManyToOne(() => User, (user) => user.medicine)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Schedule, (schedule) => schedule.medicine)
  schedules: Schedule[];
}
