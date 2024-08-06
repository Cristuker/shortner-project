import { DataSource } from "typeorm";

export const truncateDatabase = async () => {
	const appDataSource = new DataSource({
		type: "mysql",
		host: "localhost",
		port: 3306,
		username: "root",
		password: "root",
		database: "teddy_api",
	});
	const entities = ["url", "user"];
	const a = await appDataSource.initialize();

	for await (const entity of entities) {
		await a.query(`DELETE FROM ${entity};`);
	}
};
