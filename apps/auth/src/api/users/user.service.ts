import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import 'dotenv/config';

@Injectable()
export class UserService {
    private readonly baseURL = process.env.USER_SERVICE_URL;

    constructor(private readonly httpService: HttpService) {}

    async getUserByEmail(email: string) {
        const result = await this.httpService.get(`${this.baseURL}/${email}`);
        return result.data;
    }
}