import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersRepository } from "./user.repository";
import { UsersService } from "./user.service";
import { AuthModule } from "../../../auth/src/auth.module";
import { truncateDatabase } from "../../test/truncante-database";

describe("User service test", () => {
	let service: UsersService;
	let userRepository: UsersRepository;

	const userStub = () => {
		const user = new User();
		user.email = "test@test.com";
		user.password = "test";
		user.id = 1;
		user.updatedAt = new Date();
		user.createdAt = new Date();
		return user;
	};

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
				TypeOrmModule.forFeature([User]),
				AuthModule,
			],
			providers: [UsersRepository, UsersService],
		}).compile();

		service = module.get<UsersService>(UsersService);
		userRepository = module.get<UsersRepository>(UsersRepository);
	});

	beforeEach(async () => {
		await truncateDatabase();
	});

	it("should create a user", async () => {
		const userRaw = {
			email: "test3@test.com",
			password: "12345@Cl",
		};
		const user = await service.create(userRaw);
		expect(user).toBeDefined();
		expect(user.email).toBe("test3@test.com");
		expect(user.password).not.toBe("test");
		expect(user.createdAt).toBeTruthy();
		expect(user.updatedAt).toBeTruthy();
	});

	it("should find one user", async () => {
		jest.spyOn(userRepository, "findOne").mockResolvedValue(userStub());
		const result = await service.findOneByEmail("test@email.com");
		expect(result.email).toBe("test@test.com");
		expect(result.password).toBe("test");
	});
});
