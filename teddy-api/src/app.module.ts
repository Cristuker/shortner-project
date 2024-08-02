import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { UrlModule } from "./url/url.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		UsersModule,
		UrlModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "root",
			database: "teddy_api",
			entities: [__dirname + "/../**/*.entity{.ts,.js}"],
			// remove to production
			synchronize: true,
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
