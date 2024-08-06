import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUrlDTO {
	@IsString({ message: "URL must be a string" })
	@ApiProperty({
		description: "Url to be short",
		example: "https://www.google.com",
		required: true,
	})
	url: string;
}
