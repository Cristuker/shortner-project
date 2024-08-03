import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Logger,
	Post
} from "@nestjs/common";
import { AuthService } from './auth.service'
import { AuthDTO } from './dto/auth.dto';
import { UsersService } from '../users/user.service';


@Controller("auth")
export class AuthController {
	private readonly logger = new Logger(AuthController.name);

	constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

	@Post("/login")
	@HttpCode(HttpStatus.OK)
	async login(@Body() body: AuthDTO) {
		const user = await this.userService.findOneByEmail(body.email);
		if (!user) {
			this.logger.error("User not found");
			throw new BadRequestException("User not found");
		}
		const access_token = await this.authService.signIn(body.email, body.password, user.password, user.id);
		this.logger.log("User authenticated");
		return access_token;
	}
}