// @ts-ignore
import { Client } from 'pg';
import { AdminInformation, ensureDataBase } from '@group-chat/shared-data';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  createGroupsTableQuery,
  createMessagesTableQuery,
  createUsersTableQuery,
} from '../queries/start-app.queries';

@Injectable()
export class PgService implements OnModuleInit {
  private mainClient: Client;

  constructor() {}

  public async mainQuery(queryText: string, params?: any[]) {
    return this.mainClient.query(queryText, params);
  }

  public async closeMain() {
    await this.mainClient.end();
  }

  async onModuleInit() {
    this.mainClient = await ensureDataBase(
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_DEFAULT_USER,
        password: process.env.DB_DEFAULT_PASSWORD,
        database: process.env.DB_DEFAULT_DATABASE,
      },
      process.env.DB_MAIN_DATABASE,
      process.env.DB_MAIN_USER,
      process.env.DB_MAIN_PASSWORD,
      this.mainClient,
      [createGroupsTableQuery, createMessagesTableQuery, createUsersTableQuery]
    );
  }
}
