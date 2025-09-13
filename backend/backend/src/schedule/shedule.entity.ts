import { Medicine } from 'src/medicine/medicine.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.schedules, {eager: true})
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @Column('simple-array')
  times_of_the_day: string[];

  @Column()
  interval_hours: number;

  @Column()
  start_time: string;

  @Column()
  medicine_type: string; 
}
