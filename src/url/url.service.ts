import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { URLRepository } from "./url.repository";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { urlMapper } from "./urlMapper";
import { UrlUpdateDTO } from "./dto/update.url.dto";
import { isValidUrl } from './validation/urlIsValid';
import { extractUrlPath } from './extractUrl'
@Injectable()
export class URLService {
	private readonly apiRedirectURL = "http://localhost:3001";
	private readonly possibleCharacters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	constructor(private readonly urlRepository: URLRepository) {}

	async create(body: CreateUrlDTO, userId: number) {
		if (!isValidUrl(body.url)) {
			throw new BadRequestException("Url is invalid");
		}
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

	async list(userId: number) {
		const urls = await this.urlRepository.list(userId);
		const formatedUrls = urls.map((url) => urlMapper(url));
		return { urls: formatedUrls };
	}

	async update(userId: number, body: UrlUpdateDTO) {
		if (!isValidUrl(body.newUrl)) {
			throw new BadRequestException("New url is invalid");
		}
		const shortUrl = extractUrlPath(body.shortUrl);
		const url = await this.urlRepository.findByOldUrlAndUserId(body.oldUrl, shortUrl, userId);
		if (!url) {
			throw new BadRequestException("Url not found, please check information and try again");
		}
		url.originalUrl = body.newUrl;

		await this.urlRepository.update(url);

	}

	async click(url: string) {
		const shortUrl = extractUrlPath(url);
		const result = await this.urlRepository.findByShortUrl(shortUrl);
		if (!result) {
			throw new BadRequestException("Invalid url");
		}
		result.clicks++;
		await this.urlRepository.update(result);
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
