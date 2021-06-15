import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Query("MAC") MAC: string, @Query("message") message: string) {
        return this.usersService.create(MAC, message);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get()
    findOne(@Query("MAC") MAC: string) {
        return this.usersService.findOne(MAC);
    }

    @Delete()
    remove(@Query("MAC") MAC: string) {
        return this.usersService.remove(MAC);
    }
}
