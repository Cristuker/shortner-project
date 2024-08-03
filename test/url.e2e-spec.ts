import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import * as request from "supertest";
import { UsersModule } from "../src/users/users.module";
import { UrlModule } from "../src/url/url.module";
import { AuthModule } from "../src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../src/shared/constants/jwt";

describe("URL e2e", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				UsersModule,
				AuthModule,
				UrlModule,
				TypeOrmModule.forRoot({
					type: "mysql",
					host: "localhost",
					port: 3306,
					username: "root",
					password: "root",
					database: "teddy_api",
					entities: [__dirname + "/../**/*.entity{.ts,.js}"],
				}),
				JwtModule.register({
					global: true,
					secret: jwtConstants.secret,
					signOptions: { expiresIn: "60s" },
				}),
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	const generateUser = async (email: string, password: string) => {
		await request(app.getHttpServer()).post("/users/create").send({
			email,
			password,
		});
	};

	const loginUser = async (email: string, password: string) => {
		return await request(app.getHttpServer()).post("/auth/login").send({
			email,
			password,
		});
	};

	const generateUrlWithToken = async (url: string, token: string) => {
		return await request(app.getHttpServer())
			.post("/url/shorten")
			.set("authorization", `Bearer ${token}`)
			.send({
				url,
			});
	};

	it("should generate a url", async () => {
		const body = {
			url: "www.google.com.br",
		};
		return request(app.getHttpServer())
			.post("/url/shorten")
			.send(body)
			.expect(201)
			.then((response) => {
				expect(response.body.url).toBeTruthy();
			});
	});

	it("should generate a url and associate a user", async () => {
		const body = {
			url: "www.google.com.br",
		};
		await generateUser("test@test.com", "27546@Lc");
		const res = await loginUser("test@test.com", "27546@Lc");
		return request(app.getHttpServer())
			.post("/url/shorten")
			.set("authorization", `Bearer ${res.body.access_token}`)
			.send(body)
			.expect(201)
			.then((response) => {
				expect(response.body.url).toBeTruthy();
			});
	});

	it("should delete a url", async () => {
		const body = {
			url: "www.google.com.br55",
		};
		await generateUser("test@test.com", "27546@Lc");
		const resUser = await loginUser("test@test.com", "27546@Lc");
		const resUrl = await generateUrlWithToken(body.url, resUser.body.access_token);

		return request(app.getHttpServer())
			.delete("/url")
			.set("authorization", `Bearer ${resUser.body.access_token}`)
			.send({
				url: resUrl.body.url
			})
			.expect(204)
	});
});
