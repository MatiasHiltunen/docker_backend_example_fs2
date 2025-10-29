import postgres from "postgres";

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

// With this setup we might not be able to access the docker yet through the exposed port in compose for development.

const sql = postgres({
  host: POSTGRES_HOST || "127.0.0.1",
  port: POSTGRES_PORT ? Number(POSTGRES_PORT) : 5432,
  database: POSTGRES_DB || "example",
  username: POSTGRES_USER || "postgres",
  password: POSTGRES_PASSWORD || "super_salainen_salasana",
});

export default sql;
