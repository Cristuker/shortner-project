import { Module } from "@nestjs/common";
import { UrlModule } from "./url/url.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import "dotenv/config";

@Module({
	imports: [
		UrlModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
