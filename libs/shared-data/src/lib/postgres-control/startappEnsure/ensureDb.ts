import { Logger } from '@nestjs/common';
import { Client } from 'pg';
import { AdminInformation } from '../interfaces';
import { checkDataBaseExistQuery } from '../queries/queries';

export async function ensureDataBase(
  admin: AdminInformation,
  database: string,
  user: string,
  password: string,
  newClient: Client,
  tables?: string[]
): Promise<Client> {
  Logger.log('starting');

  let adminClient = new Client({
    host: admin.host,
    port: Number(admin.port) || 5432,
    user: admin.user,
    password: admin.password,
    database: admin.database,
  });
  adminClient.connect();

  //connect to default connection to create role and check db exist . .

  const userExist = await adminClient.query(`
    SELECT 1 FROM pg_roles WHERE rolname = '${user}'`);

  if (userExist.rowCount && !(userExist.rowCount > 0)) {
    await adminClient.query(`
      CREATE ROLE ${user}
      WITH LOGIN
      PASSWORD '${password}'
      CREATEDB
      NOINHERIT`);
  }

  Logger.log(`user ${user} ensured successfully`);

  // grant usage and create privileges on the public schema (to create table etc.).

  const DB = await adminClient.query(checkDataBaseExistQuery, [database]);

  // check if database is exists and if not creating them.
  if (DB.rowCount === 0)
    await adminClient.query(`CREATE DATABASE ${database} OWNER ${user}`);

  Logger.log(`Database ${database} ensured successfully`);

  await adminClient.end();

  newClient = new Client({
    host: admin.host,
    port: Number(admin.port) || 5432,
    user: user,
    password: password,
    database: database,
  });

  await newClient.connect();

  Logger.log('user connection ensured successfully ');

  const schemaName = `s_${user}`;

  const checkSchemaExist = await newClient.query(
    `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}'`
  );

  if (checkSchemaExist.rows.length === 0) {
    await newClient.query(`CREATE SCHEMA ${schemaName};`);

    await newClient.query(
      `ALTER ROLE ${user} SET search_path TO ${schemaName};`
    );

    await newClient.end();

    newClient = new Client({
      host: admin.host,
      port: Number(admin.port) || 5432,
      user: user,
      password: password,
      database: database,
    });

    await newClient.connect();

    Logger.log(`change default path to new schema`);
  }

  Logger.log(`${schemaName} schema ensured successfully`);

  if (tables)
    tables.forEach(async (table) => {
      await newClient.query(table);
    });
  Logger.log(`tables ensured successfully`);

  return newClient;
}
