import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    async create(createUserDto: CreateUserDto) {
        const manager = getMongoManager("mongo");

        const isExist = await this.exist(createUserDto.MACAddress);
        if (isExist) {
            throw new HttpException(
                "Already exist MACAddress",
                HttpStatus.CONFLICT
            );
        }

        const user = new User(createUserDto);

        return await manager.save(user);
    }

    async findAll() {
        const manager = getMongoManager("mongo");

        const user = await manager.find(User);

        return user;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async exist(MACAddress: string) {
        const users = await this.findAll();

        let isExist = false;
        for (let i = 0; i < users.length || !isExist; i++) {
            isExist = users[i].MACAddress == MACAddress;
        }

        return isExist;
    }
}
