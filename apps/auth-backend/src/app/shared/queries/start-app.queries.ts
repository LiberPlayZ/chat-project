export const createPersonalInformationTableQuery: string = `
    CREATE TABLE IF NOT EXISTS personal_information (
        id SERIAL PRIMARY KEY ,
        username VARCHAR(50) NOT NULL UNIQUE,
        IdNumber VARCHAR(9) NOT NULL UNIQUE CHECK (length(IdNumber) = 9),
        role VARCHAR(10) NOT NULL ,
        email VARCHAR(50) NOT NULL UNIQUE ,
        password VARCHAR(64) NOT NULL CHECK (length(password) = 64) ,
        salt VARCHAR(72) NOT NULL
      );`;
