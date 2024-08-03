import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "./url.entity";
import { URLRepository } from "./url.repository";
import { URLService } from "./url.service";
import { UrlController } from "./url.controller";
import { UsersModule } from "../users/users.module";
import { ApiKeyMiddleware } from './url.middleware';

@Module({
	controllers: [UrlController],
	imports: [
		TypeOrmModule.forFeature([Url]),
		UsersModule,
	],
	providers: [URLRepository, URLService],
	exports: [],
})
export class UrlModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
		  .apply(ApiKeyMiddleware)
		  .forRoutes({ path: 'url/click', method: RequestMethod.POST });
	  }
}
