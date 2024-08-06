import { ApiProperty } from "@nestjs/swagger";

export class UrlDTO {
	@ApiProperty({ description: "Shorted url" })
	url: string;

	@ApiProperty({ description: "Destination url" })
	originalURL: string;

	@ApiProperty({ description: "Count of clicks in shorted url" })
	clicks: number;

	@ApiProperty({ description: "URL is active or not" })
	active: boolean;

	@ApiProperty({ description: "When url is created" })
	createdAt: Date;

	@ApiProperty({ description: "Last time this url updated" })
	updatedAt: Date;
}
