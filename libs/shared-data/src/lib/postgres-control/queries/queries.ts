export const checkDataBaseExistQuery = `SELECT 1 FROM pg_database WHERE datname = $1`;
