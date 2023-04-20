// import {
//   Kysely,
//   PostgresDialect,
// } from "kysely"
// import { Database } from "./types"
// import {Pool} from 'pg'
import postgres from "postgres";

// import { NeonDialect } from "./NeonDailect";
// import { Pool } from '@neondatabase/serverless';

// export const dbClient = new Kysely<Database>({
//   dialect: new PostgresDialect({
//     pool: new Pool({
//       ssl: true,
//       connectionString: "postgres://uzairbangee:cr5kPWqG0oEy@ep-rapid-mountain-148403-pooler.us-east-2.aws.neon.tech/neondb"
//     })
//   })
// });

// const sql = postgres(process.env.DATABASE_URL);

export const dbClient = postgres("postgres://uzairbangee:cr5kPWqG0oEy@ep-rapid-mountain-148403.us-east-2.aws.neon.tech/neondb", {ssl: true});

