import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Logger,
	Post,
} from "@nestjs/common";
import { UsersService } from "./user.service";
import { CreateUserDTO } from "./dto/create.user.dto";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private readonly usersService: UsersService) {}

	@Post("/create")
	@HttpCode(HttpStatus.CREATED)
	@ApiBody({ type: CreateUserDTO })
	@ApiTags("User")
	@ApiResponse({ status: 400, description: "User already exists" })
	@ApiResponse({ status: 201, description: "Created" })
	async create(@Body() user: CreateUserDTO) {
		await this.usersService.create(user);
		this.logger.log("User created");
	}
}
