import { UrlDTO } from "./dto/url.dto";
import { Url } from "./url.entity";

export const urlMapper = (urlEntity: Url): UrlDTO => ({
	active: urlEntity.active,
	clicks: urlEntity.clicks,
	createdAt: urlEntity.createdAt,
	originalURL: urlEntity.originalUrl,
	url: urlEntity.shortUrl,
	updatedAt: urlEntity.updatedAt,
});
