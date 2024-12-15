export const addUserQuery = `INSERT INTO users(
    id, username,name, age)
   VALUES ($1, $2, $3, $4)
  `;

export const getUsersBesideConnectedQuery = `select username , id from users where id != $1`;

export const getUsersByFilterQuery = `
SELECT username, id from users 
WHERE username ILIKE $1 AND id != $2
ORDER BY username
`;

export const getUsernameQuery = `SELECT username FROM users WHERE id = $1`;
