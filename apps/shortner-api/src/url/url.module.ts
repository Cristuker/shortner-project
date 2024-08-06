import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "./url.entity";
import { URLRepository } from "./url.repository";
import { URLService } from "./url.service";
import { UrlController } from "./url.controller";
import { UsersModule } from "../users/users.module";

@Module({
	controllers: [UrlController],
	imports: [TypeOrmModule.forFeature([Url]), UsersModule],
	providers: [URLRepository, URLService],
	exports: [],
})
export class UrlModule {}
