import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
} from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    MACAddress: string;

    @Column()
    message: string;

    constructor(createUserDto: CreateUserDto) {
        if (createUserDto) {
            this.MACAddress = createUserDto.MACAddress;
            this.message = createUserDto.message;
        }
    }
}
