import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UsersRepository } from "./user.repository";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./user.service";
import { UsersController } from "./user.controller";
import { AuthMiddleware } from "../shared/middlewares/auth.middleware";

@Module({
    controllers: [UsersController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersRepository, UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .exclude({ path: 'users', method: RequestMethod.POST })
          .forRoutes(UsersController)
      }
}
