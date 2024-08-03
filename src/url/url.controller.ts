import { Controller, Post, Req } from "@nestjs/common";
import { URLService } from "./url.service";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { Request } from "express";

@Controller("url")
export class UrlController {
    constructor(private readonly urlService: URLService) {}

    @Post("/shorten")
    async create(@Req() request: Request<CreateUrlDTO>) {
        const { body , headers } = request;
        return await this.urlService.create(body, headers.authorization);
    }
}