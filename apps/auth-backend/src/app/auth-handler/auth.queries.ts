export const checkUserExistQuery = `select count(*) from personal_information where username = $1 OR idNumber = $2 OR email = $3`;

export const addUserQuery = `INSERT INTO personal_information(
   username, idnumber, role, email, password,salt)
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING id,role ;`;

export const checkEmailExistQuery = `select * from personal_information where email = $1 `;

export const updatePasswordAndSalt = `UPDATE personal_information SET  password = $1 , salt = $2 WHERE id = $3`;
