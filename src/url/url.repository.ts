import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { Url } from "./url.entity";

@Injectable()
export class URLRepository {
	private readonly logger = new Logger(URLRepository.name);

	constructor(
		@InjectRepository(Url) private readonly database: Repository<Url>,
	) {}

	async create(
		body: CreateUrlDTO,
		shortUrl: string,
		userId = null,
	): Promise<Url> {
		try {
			const url = this.database.create({
				active: true,
				clicks: 0,
				createdAt: new Date(),
				originalUrl: body.url,
				shortUrl: shortUrl,
				updatedAt: new Date(),
				userId: userId,
			});
			return await this.database.save(url);
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on save url");
		}
	}

	async delete(urlId: number) {
		try {
			await this.database.update(urlId, {
				active: false
			})
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on update url");
		}
	}

	async findByUrlAndUserId(shortUrl: string, userId: number) {
		try {
			const url = await this.database.findOneBy({ 
				userId: userId, 
				shortUrl: shortUrl,
				active: true
			});
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on find url");
		}
	}

	async findByOldUrlAndUserId(oldUrl: string, shortUrl: string, userId: number) {
		try {
			const url = await this.database.findOneBy({ 
				userId: userId, 
				shortUrl: shortUrl,
				originalUrl: oldUrl,
				active: true
			});
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on find url");
		}
	}

	async list(userId: number) {
		try {
			const url = await this.database.findBy({ 
				userId: userId,
				active: true
			});

			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on list url");
		}
	}

	async update(url: Url) {
		try {
			await this.database.update(url.id, url);
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on list url");
		}
	}

	async findByShortUrl(shortUrl: string) {
		try {
			const url = await this.database.findOneBy({ 
				shortUrl: shortUrl,
				active: true
			});
			return url;
		} catch (error) {
			this.logger.error(error);
			throw new Error("Error on find url");
		}
	}
}
