import { Module } from "@nestjs/common";
import { Url } from "./url.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UrlController } from "./url.controller";
import { URLService } from "./url.service";
import { URLRepository } from "./url.repository";

@Module({
	imports: [TypeOrmModule.forFeature([Url])],
	controllers: [UrlController],
	providers: [URLService, URLRepository],
})
export class UrlModule {}
