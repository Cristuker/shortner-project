import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Url {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	originalUrl: string;

	@Column()
	shortCutUrl: string;

	@Column()
	userId: number;

	@Column()
	clicks: number;

	@Column()
	active: boolean;

	@Column()
	createdAt: Date;

	@Column()
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.urls)
	user: User;
}
