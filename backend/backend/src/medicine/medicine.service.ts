import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medicine } from "./medicine.entity";
import { Repository } from "typeorm";
import { CreateMedicineDto } from "./dto/create_medicine.dto";
import { UpdateMedicineDto } from "./dto/update_medicine.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private readonly med_repo: Repository<Medicine>,

        @InjectRepository(User)
        private readonly user_repo: Repository<User>
    ){}

    async createMedicine(input: CreateMedicineDto): Promise<Medicine> {
        const user = await this.user_repo.findOne({ where: { id: input.user } });
        if (!user) throw new NotFoundException('User not found');
        
        const medicine = this.med_repo.create({
            ...input,
            user
        });
        return this.med_repo.save(medicine);
    }

    async findAllMedicine(): Promise<Medicine[]>{
        return this.med_repo.find({
            relations: ["user", "schedule"]
        })
    }

    async findOne(id: number): Promise<Medicine> {
        const medicine = await this.med_repo.findOne({
            where: { id },
            relations: ["user", 'schedule'],
        })

        if(!medicine) throw new NotFoundException("Medicine not found");

        return medicine;
    }

    async updateMedicine(id: number, input: UpdateMedicineDto): Promise<Medicine> {
        const medicine = await this.med_repo.findOne({where: {id}});
        if(!medicine) throw new NotFoundException("Medicine not found");

        if (input.user){
            const user = await this.user_repo.findOne({ where: {id : input.user}})
            if (!user) throw new NotFoundException('User not found');
            medicine.user = user
        }

        const {user:_, ...rest} = input;
        Object.assign(medicine, rest);

        return this.med_repo.save(medicine);
    }
}