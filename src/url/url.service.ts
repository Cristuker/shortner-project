import {
	BadRequestException,
	Injectable,
	NotFoundException
} from "@nestjs/common";
import { URLRepository } from "./url.repository";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { urlMapper } from "./urlMapper";
import { UrlUpdateDTO } from "./dto/update.url.dto";
import { isValidUrl } from "./validation/urlIsValid";
import { extractUrlPath } from "./extractUrl";
import { POSSIBLE_CHARACTERS } from '../shared/constants/shortUrlCharacters';
import 'dotenv/config';

@Injectable()
export class URLService {
	private readonly apiRedirectURL = process.env.API_REDIRECT_BASE;
	constructor(private readonly urlRepository: URLRepository) {}

	async create(body: CreateUrlDTO, userId: number) {
		if (!isValidUrl(body.url)) {
			throw new BadRequestException("Url is invalid");
		}
		const shortUrl = this.generateShortUrl();
		const url = await this.urlRepository.create(body, shortUrl, userId);
		return { url: `${this.apiRedirectURL}/${url.shortUrl}` };
	}

	async delete(shortUrl: string, userId: number) {
		const url = await this.urlRepository.findByUrlAndUserId(shortUrl, userId);
		if (!url) {
			throw new BadRequestException("Url don't exist");
		}
		await this.urlRepository.delete(url.id);
	}

	async list(userId: number) {
		const urls = await this.urlRepository.list(userId);
		const formatedUrls = urls.map((url) => urlMapper(url));
		const urlsWithFullLink = formatedUrls.map((url) => ({
			...url,
			url: `${this.apiRedirectURL}/${url.url}`,
		}));
		return { urls: urlsWithFullLink };
	}

	async update(userId: number, body: UrlUpdateDTO) {
		if (!isValidUrl(body.newUrl)) {
			throw new BadRequestException("New url is invalid");
		}
		const shortUrl = extractUrlPath(body.shortUrl);
		const url = await this.urlRepository.findByOldUrlAndUserId(
			shortUrl,
			userId,
		);
		if (!url) {
			throw new NotFoundException(
				"Url not found, please check information and try again",
			);
		}
		url.originalUrl = body.newUrl;

		await this.urlRepository.update(url);
	}

	private generateShortUrl(): string {
		let text = "";
		for (let i = 0; i < 6; i++)
			text += POSSIBLE_CHARACTERS.charAt(
				Math.floor(Math.random() * POSSIBLE_CHARACTERS.length),
			);
		return text;
	}
}
