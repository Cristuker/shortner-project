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

@Controller("users")
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private readonly usersService: UsersService) {}

	@Post("/create")
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() user: CreateUserDTO) {
		await this.usersService.create(user);
		this.logger.log("User created");
	}

	// @Get('/test')
	// @UseGuards(AuthGuard)
	// test() {
	// 	return "teste"
	// }
}
