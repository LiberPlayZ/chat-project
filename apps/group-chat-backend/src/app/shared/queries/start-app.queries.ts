export const createUsersTableQuery: string = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY ,
        username VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(50) NOT NULL ,
        age INT NOT NULL ,
        image VARCHAR(100),
        description VARCHAR(50),
        groups integer[] 
      );`;

export const createGroupsTableQuery: string = `
      CREATE TABLE IF NOT EXISTS groups (
          id SERIAL PRIMARY KEY ,
          name VARCHAR(50) NOT NULL ,
          description VARCHAR(80) NOT NULL ,
          manager_user INT NOT NULL , 
          users integer[] ,
          messages integer[] 
        );`;

export const createMessagesTableQuery: string = `
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY ,
        text VARCHAR(150) NOT NULL ,
        userId  INT NOT NULL ,
        username  VARCHAR(50) NOT NULL ,
        groupId INT NOT NULL ,
        date TIMESTAMP WITH TIME ZONE  NOT NULL ,
        image BYTEA 
      );`;
