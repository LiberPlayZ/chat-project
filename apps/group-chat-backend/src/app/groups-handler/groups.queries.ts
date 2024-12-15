export const addGroupQuery = `
   INSERT INTO groups(
    name, description, manager_user, users)
    VALUES ($1, $2, $3, $4)
    RETURNING id,name,description;
   `;

export const getAllGroupsQuery = `
SELECT groups.name , groups.description FROM groups
`;

export const getUserGroupsQuery = `
SELECT groups.id,groups.name,groups.description FROM users 
JOIN groups ON groups.id = ANY(users.groups) WHERE users.id = $1
`;

export const addGroupToUserQuery = `UPDATE users SET groups = array_append(groups,$1) WHERE id = $2`;

export const leaveGroupToUserQuery = `UPDATE users SET groups = array_remove(groups,$1) WHERE id = $2`;

export const deleteUserFromGroupQuery = `
UPDATE groups SET users = array_remove(users,$1)
WHERE id = $2
RETURNING groups.users`;

export const deleteGroupQuery = `DELETE FROM groups WHERE id = $1`;

export const getGroupNameByIdQuery = `SELECT name FROM groups WHERE id = $1`;
