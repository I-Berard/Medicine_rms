import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medicine } from "./medicine.entity";
import { Repository } from "typeorm";
import { CreateMedicineDto } from "./dto/create_medicine.dto";
import { UpdateMedicineDto } from "./dto/update_medicine.dto";
import { User } from "src/users/user.entity";
import { MedicineDto } from "./dto/medicine.dto";

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private readonly med_repo: Repository<Medicine>,

        @InjectRepository(User)
        private readonly user_repo: Repository<User>
    ) { }

    async createMedicine(input: CreateMedicineDto): Promise<Medicine> {
        const user = await this.user_repo.findOne({ where: { id: input.user } });
        if (!user) throw new NotFoundException('User not found');

        const medicine = this.med_repo.create({
            ...input,
            user
        });
        return this.med_repo.save(medicine);
    }

    async findAllMedicine(): Promise<MedicineDto[]> {
        const medicine = this.med_repo.find({
            relations: ["user", "schedule"]
        })

        return (await medicine).map(m => ({
            id: m.id,
            name: m.name,
            form: m.form,
            description: m.description,

            user: m.user && {
                id: m.user.id,
                name: m.user.name,
                email: m.user.email,
            },

            schedule: m.schedule?.map(s => ({
                id: s.id,
                times_of_the_day: s.times_of_the_day,
                interval_hours: s.interval_hours,
                start_time: s.start_time,
                times: s.times,
                medicine_type: s.medicine_type,
            })) ?? [], 
        }));

    }

    async findOne(id: number): Promise<Medicine> {
        const medicine = await this.med_repo.findOne({
            where: { id },
            relations: ["user", 'schedule'],
        })

        if (!medicine) throw new NotFoundException("Medicine not found");

        return medicine;
    }

    async findOneByUserId(userId: number): Promise<Medicine[]> {
        const medicine = await this.med_repo.find({
            relations: ["user", "schedule"],
            where: {
                user: { id: userId }
            },
        })

        if (!medicine) throw new NotFoundException("Medicine not found");

        return medicine
    }

    async updateMedicine(id: number, input: UpdateMedicineDto): Promise<Medicine> {
        const medicine = await this.med_repo.findOne({ where: { id } });
        if (!medicine) throw new NotFoundException("Medicine not found");

        if (input.user) {
            const user = await this.user_repo.findOne({ where: { id: input.user } })
            if (!user) throw new NotFoundException('User not found');
            medicine.user = user
        }

        const { user: _, ...rest } = input;
        Object.assign(medicine, rest);

        return this.med_repo.save(medicine);
    }
}