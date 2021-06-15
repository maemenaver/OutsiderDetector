import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { UsersService } from "src/users/users.service";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import spawnAsync from "@expo/spawn-async";
import { getMongoManager } from "typeorm";

@Injectable()
export class ConfigService {
    constructor(private usersService: UsersService) {}

    create(createConfigDto: CreateConfigDto) {
        return "This action adds a new config";
    }

    findAll() {
        return `This action returns all config`;
    }

    findOne(id: number) {
        return `This action returns a #${id} config`;
    }

    update(id: number, updateConfigDto: UpdateConfigDto) {
        return `This action updates a #${id} config`;
    }

    remove(id: number) {
        return `This action removes a #${id} config`;
    }

    @Interval(5000)
    async getNetwork() {
        try {
            const manager = getMongoManager("mongo");
            let getNetwork$ = spawnAsync("python3", [
                "main.py",
                process.env.SEARCH_RANGE,
            ]);
            const result = await getNetwork$;
            let obj: {
                IP: string;
                MAC: string;
            }[] = [];

            let str = result.stdout.split("\n");
            for (let i = 0; i < str.length - 1; i++) {
                const splited = str[i].split("\t");
                obj = [
                    ...obj,
                    {
                        IP: splited[0],
                        MAC: splited[1],
                    },
                ];
            }

            if (!obj) {
                return;
            }

            const users = await this.usersService.findAll();
            for (let i = 0; i < users.length; i++) {
                let indexFound = -1;
                for (let j = 0; j < obj.length; j++) {
                    if (users[i].MACAddress == obj[j].MAC) {
                        indexFound = j;
                    }
                }

                switch (!!indexFound) {
                    case true:
                        users[i].isConnected = true;
                        users[i].threshold = 0;
                        break;

                    case false:
                        users[i].threshold = users[i].threshold + 1;
                        if (
                            users[i].threshold >= +process.env.SEARCH_THRESHOLD
                        ) {
                            users[i].isConnected = false;
                        }
                        break;
                }
            }

            return await manager.save(users);
        } catch (err) {
            console.error(err);
        }
    }
}
