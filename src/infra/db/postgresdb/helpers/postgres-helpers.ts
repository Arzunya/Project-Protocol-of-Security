import { Client } from "pg";

interface PostgresHelper {
    client: Client | null;
    connect(): Promise<void>;
    end(): Promise<void>;
}

const postgresHelper: PostgresHelper = {
    client: null,
    async connect(): Promise<void> {
        postgresHelper.client = new Client({
            host: "localhost",
            port: 5432,
            database: "cemti",
            user: "postgres",
            password: "123",
        });
    },
    

    async end(): Promise<void> {
        if (postgresHelper.client) {
            await postgresHelper.client.end();
        }
    },
};

export { postgresHelper };

