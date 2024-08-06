import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Url } from "./url.entity";

@Injectable()
export class URLRepository {
	private readonly logger = new Logger(URLRepository.name);

	constructor(
		@InjectRepository(Url) private readonly database: Repository<Url>,
	) {}

	async findByShortUrl(shortUrl: string) {
		try {
			const url = await this.database.findOneBy({
				shortUrl: shortUrl,
				active: true,
			});
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on find url");
		}
	}

	async update(url: Url) {
		try {
			url.updatedAt = new Date();
			await this.database.update(url.id, url);
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on list url");
		}
	}
}
