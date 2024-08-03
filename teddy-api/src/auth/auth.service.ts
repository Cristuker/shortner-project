import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	async signIn(
		email: string,
		password: string,
        hashedPassword: string,
		id: number,
	): Promise<{ access_token: string }> {
		if (!this.comparePassword(password, hashedPassword)) {
			throw new UnauthorizedException("Password is incorrect");
		}

		const payload = { sub: id, username: email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async comparePassword(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}
}
