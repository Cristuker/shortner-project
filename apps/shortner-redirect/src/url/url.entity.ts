import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	originalUrl: string;

	@Column()
	shortUrl: string;

	@Column({ nullable: true })
	userId: number;

	@Column()
	clicks: number;

	@Column()
	active: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;
}
