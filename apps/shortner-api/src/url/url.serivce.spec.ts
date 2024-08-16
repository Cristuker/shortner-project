import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../../../auth/src/auth.module";
import { URLRepository } from "./url.repository";
import { URLService } from "./url.service";
import { Url } from "./url.entity";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { JwtService } from "@nestjs/jwt";
import { truncateDatabase } from "../../test/truncante-database";

describe("URL Service", () => {
	let service: URLService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				TypeOrmModule.forRoot({
					type: "mysql",
					host: "localhost",
					port: 3306,
					username: "root",
					password: "root",
					database: "teddy_api",
					entities: [__dirname + "/../**/*.entity{.ts,.js}"],
				}),
				TypeOrmModule.forFeature([Url]),
				AuthModule,
			],
			providers: [URLRepository, URLService],
		})
			.overrideProvider(JwtService)
			.useValue({
				verifyAsync: () => ({ id: 1 }),
			})
			.compile();

		service = module.get<URLService>(URLService);
	});

	beforeEach(async () => {
		await truncateDatabase();
	});
	it("should generate a short url, save and return it with a link to redirect api", async () => {
		const body: CreateUrlDTO = {
			url: "https://www.google.com.br",
		};
		const result = await service.create(body, null);
		expect(result.url.indexOf("http://localhost:3001/")).toBe(0);
	});
});
