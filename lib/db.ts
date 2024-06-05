import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    user: process.env.NEXT_PUBLIC_MYSQL_USER,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
});

export { pool };
