import { Medicine } from 'src/medicine/medicine.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.schedule, {eager: true})
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @Column('simple-array', {default: null})
  times_of_the_day: string[];

  @Column({default: null})
  interval_hours: number;

  @Column({default: null})
  start_time: string;

  @Column()
  times: number

  @Column()
  medicine_type: string; 
}
