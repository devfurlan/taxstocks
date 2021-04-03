module.exports = {
  "type": "postgres",
  "host": process.env.PG_HOST,
  "port": process.env.PG_PORT,
  "username": process.env.PG_USERNAME,
  "password": process.env.PG_PASSWORD,
  "database": process.env.PG_NAME,
  "entities": ["./src/models/*.ts"],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}