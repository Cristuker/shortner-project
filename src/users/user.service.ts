import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { userMapper } from "./user.mapper";
import { CreateUserDTO } from "./dto/create.user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly saltOrRounds = 10;

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(user: CreateUserDTO): Promise<UserDTO> {
        const alreadyExistUser = await this.usersRepository.findOne(user.email);
        if (alreadyExistUser) {
            throw new BadRequestException("User already exists.");
        }
        const encryptedPassword = await this.encryptPassword(user.password);
        const userSaved = await this.usersRepository.create(user.email, encryptedPassword);
        return userMapper(userSaved);
    }

    async findOneByEmail(email: string) {
        const user = await this.usersRepository.findOne(email);
        return userMapper(user);
    }

    private async encryptPassword(password: string) {
		return await bcrypt.hash(password, this.saltOrRounds);

    }
}