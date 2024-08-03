import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "./url.entity";
import { URLRepository } from "./url.repository";
import { URLService } from "./url.service";
import { UrlController } from "./url.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../shared/constants/jwt";

@Module({
	controllers: [UrlController],
	imports: [
		TypeOrmModule.forFeature([Url]),
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "60s" },
		}),
	],
	providers: [URLRepository, URLService],
	exports: [],
})
export class UrlModule {}
