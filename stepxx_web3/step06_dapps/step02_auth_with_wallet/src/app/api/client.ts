import postgres from "postgres";

export const dbClient = postgres(process.env.NEXT_PUBLIC_DB_STRING!, {ssl: true});

