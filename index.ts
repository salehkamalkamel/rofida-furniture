import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./db/schema";

// Required for Neon transactions to work in a Node.js environment (Next.js server actions)
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

const db = drizzle(pool, { schema });

export default db;
