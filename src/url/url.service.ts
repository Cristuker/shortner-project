import { Injectable } from "@nestjs/common";
import { URLRepository } from "./url.repository";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../shared/constants/jwt";

@Injectable()
export class URLService {
	private readonly apiRedirectURL = "http://localhost:3001";
	private readonly possibleCharacters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	constructor(
		private readonly urlRepository: URLRepository,
		private readonly jwtService: JwtService,
	) {}

	async create(body: CreateUrlDTO, token: string) {
		const shortUrl = this.shortUrl();
		const userId = this.tokenInfo(token);
		const url = await this.urlRepository.create(body, shortUrl, userId);
		return { url: `${this.apiRedirectURL}/${url.shortUrl}` };
	}

	private shortUrl(): string {
		let text = "";
		for (let i = 0; i < 6; i++)
			text += this.possibleCharacters.charAt(
				Math.floor(Math.random() * this.possibleCharacters.length),
			);
		return text;
	}

	async tokenInfo(token: string) {
		if (!token) return null;
		const [,jwt] = token.split(" ")
		const payload = await this.jwtService.verifyAsync<{
			id: number;
			username: string;
		}>(jwt, {
			secret: jwtConstants.secret,
		});
		return payload.id;
	}
}
