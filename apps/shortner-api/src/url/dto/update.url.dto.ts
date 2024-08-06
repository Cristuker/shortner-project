import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UrlUpdateDTO {
	@IsString({ message: "New url must be a string" })
	@ApiProperty({ description: "New destination url" })
	newUrl: string;

	@IsString({ message: "Shorted url must be a string" })
	@ApiProperty({ description: "The shorted url" })
	shortUrl: string;
}
