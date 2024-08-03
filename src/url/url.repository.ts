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
}
