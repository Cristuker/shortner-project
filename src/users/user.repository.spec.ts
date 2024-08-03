import { TestingModule, Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { UsersRepository } from "./user.repository";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "src/auth/auth.service";

describe("User repository", () => {
	let repository: Repository<User>;
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
			],
			providers: [UsersRepository],
		}).compile();

		repository = module.get<Repository<User>>(getRepositoryToken(User));
		userRepository = module.get<UsersRepository>(UsersRepository);
	});

	it("should create a user", async () => {
		const user = await userRepository.create("test@test.com", "test");
		expect(user).toBeDefined();
		expect(user.email).toBe("test@test.com");
		expect(user.password).toBe("test");
	});

	it("should find one user", async () => {
		const mock = userStub();
		jest.spyOn(repository, "findOne").mockResolvedValue(mock);
		const result = await userRepository.findOne("test@email.com");
		expect(result).toBe(mock);
	});
});
