import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { URLService } from "./url.service";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { UrlUpdateDTO } from "./dto/update.url.dto";
import { Request } from "express";
import { AuthGuard } from "../auth/auth.guard";
import {
	ApiBody,
	ApiHeader,
	ApiParam,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { UrlDTO } from "./dto/url.dto";
@Controller("url")
@ApiTags("Url")
export class UrlController {
	constructor(private readonly urlService: URLService) {}

	@Post("/shorten")
	@UseGuards(AuthGuard)
	@ApiHeader({
		name: "authorization",
		example: "Bearer tokewxyz",
		description: "Authorization token",
	})
	@ApiBody({ type: CreateUrlDTO })
	@ApiResponse({ status: 201, description: "Created" })
	@ApiResponse({ status: 400, description: "Url is invalid" })
	async create(@Req() request: Request<CreateUrlDTO>) {
		const { body } = request;
		const userId = Reflect.has(request, "user") ? request["user"].id : null;

		return await this.urlService.create(body, userId);
	}

	@Delete("/:url")
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiHeader({
		name: "authorization",
		example: "Bearer tokewxyz",
		required: true,
		description: "Authorization token",
	})
	@ApiResponse({ status: 204, description: "No content" })
	@ApiResponse({ status: 400, description: "Url don't exist" })
	@ApiResponse({ status: 401, description: "Unathorized" })
	@ApiParam({
		example: "https://www.google.com",
		name: "url",
	})
	async delete(@Req() request: Request, @Param("url") url: string) {
		await this.urlService.delete(url, request["user"].id);
	}

	@Get("/")
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiHeader({
		name: "authorization",
		example: "Bearer tokewxyz",
		required: true,
		description: "Authorization token",
	})
	@ApiResponse({ status: 401, description: "Unathorized" })
	@ApiResponse({ status: 200, description: "Ok", type: [UrlDTO] })
	async list(@Req() request: Request) {
		return await this.urlService.list(request["user"].id);
	}

	@Patch("/")
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiHeader({
		name: "authorization",
		example: "Bearer tokewxyz",
		required: true,
		description: "Authorization token",
	})
	@ApiResponse({ status: 200, description: "Ok", type: null })
	@ApiResponse({ status: 400, description: "New url is invalid" })
	@ApiResponse({
		status: 404,
		description: "Url not found, please check information and try again",
	})
	@ApiResponse({ status: 401, description: "Unathorized" })
	@ApiBody({ type: UrlUpdateDTO })
	async update(@Req() request: Request, @Body() body: UrlUpdateDTO) {
		await this.urlService.update(request["user"].id, body);
	}
}
