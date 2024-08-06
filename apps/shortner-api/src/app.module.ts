import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { UrlModule } from "./url/url.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import "dotenv/config";
@Module({
	imports: [
		UsersModule,
		UrlModule,
		AuthModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			synchronize: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
