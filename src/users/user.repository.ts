import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersRepository {
	private readonly logger = new Logger(UsersRepository.name);

	constructor(
		@InjectRepository(User) private readonly database: Repository<User>,
	) {}

	async create(email: string, password: string): Promise<User> {
		try {
			const user = { email, password };
			return await this.database.save(user);
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on save user");
		}
	}

	async findOne(email: string) {
		try {
			return await this.database.findOne({
				where: {
					email,
				},
			});
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on find user");
		}
	}
}
