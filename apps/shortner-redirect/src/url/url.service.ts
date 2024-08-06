import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { URLRepository } from "./url.repository";

@Injectable()
export class URLService {
	constructor(private readonly urlRepository: URLRepository) {}

	async findOriginalUrl(shortUrl: string) {
		const result = await this.urlRepository.findByShortUrl(shortUrl);
		if (!result) {
			throw new NotFoundException("URL not found");
		}
		return result;
	}

	async click(url: string) {
		const result = await this.urlRepository.findByShortUrl(url);
		if (!result) {
			throw new BadRequestException("Invalid url");
		}
		result.clicks++;
		await this.urlRepository.update(result);
	}
}
