import "dotenv/load.ts";
import { Database, Model, DataTypes, PostgresConnector } from "denodb/mod.ts";

const host = Deno.env.get("DB_HOST");
const username = Deno.env.get("DB_USER");
const password = Deno.env.get("DB_PASSWORD");
const database = Deno.env.get("POSTGRES_DB");
const port = Deno.env.get("DB_PORT");

if (!(host && username && password && database && port)) {
  throw new Error("Missing environment variables");
}

const connector = new PostgresConnector({
  host,
  username,
  password,
  database,
  port: Number(port),
});

const db = new Database(connector);

export class Article extends Model {
  static table = "articles";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
    title: DataTypes.string(255),
    content: DataTypes.TEXT,
  };
}

db.link([Article]);
