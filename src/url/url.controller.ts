import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { URLService } from "./url.service";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { UrlUpdateDTO } from "./dto/update.url.dto";
import { Request } from "express";
import { AuthGuard } from "../auth/auth.guard";
import { ClickDTO } from './dto/click.dto';
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
        await this.urlService.delete(url, request['user'].id)
    }

    @Get("/")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async list(@Req() request: Request) {
        return await this.urlService.list(request['user'].id);
    }

    @Patch("/")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async update(@Req() request: Request<UrlUpdateDTO>) {
        return await this.urlService.update(request['user'].id, request.body)
    }

    @Post("/click")
    @HttpCode(HttpStatus.OK)
    async click(@Body() body: ClickDTO) {
        await this.urlService.click(body.url);
    }


}