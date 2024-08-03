import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { userMapper } from "./user.mapper";
import { passwordIsInvalid } from "./validations/passwordValidation";
import { emailIsInvalid } from "./validations/emailValidation";
import { CreateUserDTO } from "./dto/create.user.dto";
import { AuthService } from "../auth/auth.service"
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    private readonly saltOrRounds = 10;

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(user: CreateUserDTO): Promise<UserDTO> {
        if (passwordIsInvalid(user.password)) {
            throw new BadRequestException('error on validate password');
        }
        if (emailIsInvalid(user.email)) {
            throw new BadRequestException('error on validate email');
        }
        const encryptedPassword = await this.encryptPassword(user.password);
        const userSaved = await this.usersRepository.create(user.email, encryptedPassword);
        return userMapper(userSaved);
    }

    async findOneByEmail(email: string) {
        const user = await this.usersRepository.findOne(email);
        if (!user) {
            throw new BadRequestException("User don't exist");
        }
        return userMapper(user);
    }

    private async encryptPassword(password: string) {
		return await bcrypt.hash(password, this.saltOrRounds);

    }
}