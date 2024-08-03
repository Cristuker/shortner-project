import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../shared/constants/jwt";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "60s" },
		}),
		UsersModule
	],
	controllers: [AuthController],
	providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
