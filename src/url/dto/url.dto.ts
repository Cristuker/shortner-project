export class UrlDTO {
    url: string;
    originalURL!: string;
    clicks: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}