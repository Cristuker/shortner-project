import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { URLService } from "./url.service";
import { Response } from "express";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("")
@ApiTags("Redirect")
export class UrlController {
	constructor(private readonly urlService: URLService) {}

	@Get("/:shortUrl")
	@ApiResponse({
		status: HttpStatus.PERMANENT_REDIRECT,
		description: "Redirect to destination url",
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Destination URL not found",
	})
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Invalid url" })
	@ApiParam({ name: "shortUrl", required: true, type: String })
	async redirect(@Param("shortUrl") shortUrl: string, @Res() res: Response) {
		const result = await this.urlService.findOriginalUrl(shortUrl);
		await this.urlService.click(shortUrl);
		return res
			.status(HttpStatus.PERMANENT_REDIRECT)
			.redirect(result.originalUrl);
	}
}
