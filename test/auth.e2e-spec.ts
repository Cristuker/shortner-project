import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import * as request from "supertest";
import { UsersModule } from "../src/users/users.module";
import { AuthModule } from "../src/auth/auth.module";
import { UsersService } from "../src/users/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("Auth e2e", () => {
	let app: INestApplication;
	const userStub = () => ({
		id: 1,
		email: "test@test.com",
		createdAt: new Date(),
		updatedAt: new Date(),
		password: "123",
	});

	const usersService = {
		findOneByEmail: () => userStub(),
	};

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				UsersModule,
				AuthModule,
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
			.overrideProvider(UsersService)
			.useValue(usersService)
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should generate a token", async () => {
		const user = userStub();
		return request(app.getHttpServer())
			.post("/auth/login")
			.send(user)
			.expect(200)
			.then((response) => {
				expect(response.body).toHaveProperty("access_token");
				expect(response.body.access_token.length).toBeGreaterThan(0);
			});
	});
});
