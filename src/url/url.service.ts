import { Injectable, NotFoundException } from "@nestjs/common";
import { URLRepository } from "./url.repository";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { DeleteUrlDTO } from "./dto/delete.url.dto";

@Injectable()
export class URLService {
	private readonly apiRedirectURL = "http://localhost:3001";
	private readonly possibleCharacters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	constructor(
		private readonly urlRepository: URLRepository,
	) {}

	async create(body: CreateUrlDTO, userId: number) {
		const shortUrl = this.shortUrl();
		const url = await this.urlRepository.create(body, shortUrl, userId);
		return { url: `${this.apiRedirectURL}/${url.shortUrl}` };
	}

	async delete(shortUrl: string, userId: number) {
		const url = await this.urlRepository.findByUrlAndUserId(shortUrl, userId);
		if (!url) {
			throw new NotFoundException("Url don't exist");
		}
		await this.urlRepository.delete(url.id);
	}

	private shortUrl(): string {
		let text = "";
		for (let i = 0; i < 6; i++)
			text += this.possibleCharacters.charAt(
				Math.floor(Math.random() * this.possibleCharacters.length),
			);
		return text;
	}
}
