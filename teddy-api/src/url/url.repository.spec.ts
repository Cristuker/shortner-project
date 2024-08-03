import { Test, TestingModule } from "@nestjs/testing";
import { URLRepository } from "./url.repository";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../users/user.repository";
import { Repository } from "typeorm";
import { Url } from "./url.entity";
import { CreateUrlDTO } from "./dto/create.url.dto";
import { UsersModule } from "../users/users.module";
import { User } from "../users/user.entity";

describe("URL Repository", () => {
	let repository: Repository<Url>;
	let urlRepository: URLRepository;
	let usersRepository: UsersRepository;

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
				TypeOrmModule.forFeature([Url, User]),
			],
			providers: [
				URLRepository,
				UsersRepository,
			],
		}).compile();

		repository = module.get<Repository<Url>>(getRepositoryToken(Url));
		urlRepository = module.get<URLRepository>(URLRepository);
		usersRepository = module.get<UsersRepository>(UsersRepository);
	});

	it("should create a url without user", async () => {
		const body: CreateUrlDTO = {
			url: "https://www.google.com.br",
		};
		const result = await urlRepository.create(body, "goo.co");
		expect(result).toBeDefined();
		expect(result.originalUrl).toBe("https://www.google.com.br");
		expect(result.shortUrl).toBe("goo.co");
		expect(result.clicks).toBe(0);
		expect(result.active).toBe(true);
	});

	it("should create a url with user", async () => {
        const user = await usersRepository.create("test@test.com", "test");
		const body: CreateUrlDTO = {
			url: "https://www.google.com.br",
		};
		const result = await urlRepository.create(body, "goo.co", user.id);
		expect(result).toBeDefined();
		expect(result.originalUrl).toBe("https://www.google.com.br");
		expect(result.shortUrl).toBe("goo.co");
		expect(result.clicks).toBe(0);
		expect(result.active).toBe(true);
	});
});
