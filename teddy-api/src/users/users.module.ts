import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UsersRepository } from "./user.repository";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./user.service";
import { UsersController } from "./user.controller";

@Module({
    controllers: [UsersController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersRepository, UsersService],
    exports: [UsersService]
})
export class UsersModule {
}
