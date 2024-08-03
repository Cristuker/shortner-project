import { BadRequestException } from "@nestjs/common";

export const extractUrlPath = (url: string) => {
    try {
        const urlFormated = new URL(url);
        return urlFormated.pathname.replace('/', '');
    } catch (error) {
        throw new BadRequestException("Send a valid url");
    }
}