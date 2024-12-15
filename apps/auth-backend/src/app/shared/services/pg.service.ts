// @ts-ignore
import { Client } from 'pg';
import { ensureDataBase } from '@group-chat/shared-data';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { createPersonalInformationTableQuery } from '../queries/start-app.queries';

@Injectable()
export class PgService implements OnModuleInit {
  private authClient: Client;

  constructor() {}

  public async authQuery(queryText: string, params?: any[]) {
    return this.authClient.query(queryText, params);
  }

  public async closeAuth() {
    await this.authClient.end();
  }

  async onModuleInit() {
    this.authClient = await ensureDataBase(
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_DEFAULT_USER,
        password: process.env.DB_DEFAULT_PASSWORD,
        database: process.env.DB_DEFAULT_DATABASE,
      },
      process.env.DB_AUTH_DATABASE,
      process.env.DB_AUTH_USER,
      process.env.DB_AUTH_PASSWORD,
      this.authClient,
      [createPersonalInformationTableQuery]
    );
  }
}
