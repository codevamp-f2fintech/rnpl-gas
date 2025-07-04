import mysql, { Pool } from 'mysql2/promise';

export const db: Pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || "rnpl_local",
});
