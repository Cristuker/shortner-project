import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import * as request from "supertest";
import { UrlModule } from "../src/url/url.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { URLService } from "../src/url/url.service";

describe("URL e2e", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
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
			],
		})
			.overrideProvider(URLService)
			.useValue({
				findOriginalUrl: () => ({
					id: 1,
					originalUrl: "https://www.google.com.br",
					shortUrl: "wxyz",
					userId: 1,
					clicks: 0,
					active: true,
					createdAt: new Date(),
					updatedAt: new Date(),
				}),
				click: () => {},
			})
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should redirect to the original url and click it", async () => {
		const shortUrl = "wxyz";

		return request(app.getHttpServer())
			.get(`/${shortUrl}`)
			.expect(302)
			.expect("Location", "https://www.google.com.br");
	});
});
