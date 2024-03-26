import { pool } from "../db.js";

async function initDB() {
    try {
        await createUsersTable();
        await createOrdersTable();
        console.log("Database initialization complete");
    } catch (error) {
        console.error("Database initialization error:", error);
    }
}

async function createUsersTable() {
    try {
        const res = await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            first_name varchar(255),
            last_name varchar(255),        
            age int,       
            active BOOLEAN NOT NULL DEFAULT true
        );
        INSERT INTO users (first_name, last_name, age) VALUES 
            ('John', 'Doe', 18),
            ('Bob', 'Dylan', 30),
            ('Jane', 'Doe', 25);
        `);
        console.log('Table users has been created', res);
    } catch(error) {
        console.error('Error creating users table:', error);
        throw error;
    }
}

async function createOrdersTable() {
    try {
        const res = await pool.query(`
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            price float,
            date timestamp,
            user_id int,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        INSERT INTO orders (price, date, user_id) VALUES 
            (18, '2021-01-01 00:00:00', 1),
            (18, '2021-01-02 04:00:00', 1),
            (18, '2021-01-03 05:00:00', 2),
            (18, '2021-01-04 06:00:00', 2);
            `);
        console.log('Table orders created', res);
    } catch(error) {
        console.error('Error creating orders table:', error);
        throw error;
    }
}

initDB(); // Aufruf der Initialisierungsfunktion
