const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "my_app",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "postgres",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
    }
);

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected");
        // Sync models
        await sequelize.sync();
    } catch (error) {
        console.error("PostgreSQL connection error:", error);
    }
};

module.exports = { sequelize, db };