import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Url } from "./url.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Url])]
})
export class UrlModule {}
