import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateUserDTO } from "../src/users/dto/create.user.dto";
import { UsersModule } from "../src/users/users.module";
import * as request from 'supertest';

describe('/users', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
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
          UsersModule,
        ],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    })

    it("should create a user and return created", async () => {
        const user: CreateUserDTO = {
            email: 'test@test.com',
            password: '27546@Lc'
        } 
        return request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201)
    });
})