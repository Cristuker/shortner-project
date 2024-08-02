import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
	Res,
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDTO } from "./dto/create.user.dto";
import { Response } from "express";

@Controller("users")
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private readonly usersService: UsersService) {}

	@Post("/")
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() user: CreateUserDTO, @Res() res: Response) {
		try {
			await this.usersService.create(user);
			this.logger.log("User created");
			return res.status(HttpStatus.CREATED).json({
				code: HttpStatus.CREATED,
				message: "User created",
			});
		} catch (error) {
			this.logger.error(error);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				code: HttpStatus.INTERNAL_SERVER_ERROR,
				message: "Error while creating user",
			});
		}
	}
}
