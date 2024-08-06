import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
	@IsEmail({}, { message: "Invalid e-mail" })
	@ApiProperty({
		description: "E-mail to login",
		example: "test@email.com",
		required: true,
	})
	email: string;

	@IsStrongPassword(
		{
			minLength: 6,
			minLowercase: 1,
			minNumbers: 1,
			minSymbols: 1,
			minUppercase: 1,
		},
		{ message: "Invalid password " },
	)
	@ApiProperty({
		description: "Password to login",
		example: "123456@Bk",
		required: true,
	})
	password: string;
}
