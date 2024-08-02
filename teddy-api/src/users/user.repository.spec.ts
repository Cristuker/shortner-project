import { TestingModule, Test } from "@nestjs/testing";
import { User } from "./user.entity";
import { UsersRepository } from "./user.repository";
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from "typeorm";


describe("User repository", () => {
    let repository: Repository<User>;
    let userRepository: UsersRepository;
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
              TypeOrmModule.forFeature([User])
            ],
            providers: [
              UsersRepository
            ]
          }).compile();
      
          repository = module.get<Repository<User>>(getRepositoryToken(User));
          userRepository = module.get<UsersRepository>(UsersRepository);

    });

    it("should create a user", async () => {
      const user = await userRepository.create('test@test.com', 'test');
      expect(user).toBeDefined();
      expect(user.email).toBe('test@test.com');
      expect(user.password).toBe('test');
    });
})