import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { URLService } from "./url.service";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { DeleteUrlDTO } from "./dto/delete.url.dto";
import { Request } from "express";
import { AuthGuard } from "../auth/auth.guard";

@Controller("url")
export class UrlController {
    constructor(private readonly urlService: URLService) {}

    @Post("/shorten")
    @UseGuards(AuthGuard)
    async create(@Req() request: Request<CreateUrlDTO>) {
        const { body } = request;
        const userId = Reflect.has(request, 'user') ? request['user'].id : null;

        return await this.urlService.create(body, userId);
    }

    @Delete("/:url")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Req() request: Request, @Param('url') url: string) { 
        const userId = Reflect.has(request, 'user') ? request['user'].id : null;
        await this.urlService.delete(url, userId)
    }
}