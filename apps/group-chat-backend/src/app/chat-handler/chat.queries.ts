export const getGroupMessagesQuery = `
SELECT messages.id,messages.text,messages.userid,messages.username,messages.groupid,messages.date
FROM groups 
JOIN messages ON messages.id = ANY(groups.messages) WHERE groups.id = $1`;

export const getSenderUserNameQuery = `SELECT username FROM users WHERE id = $1`;

export const addMessageQuery = `
INSERT INTO
messages (
  
  text, 
  userid, 
  username, 
  groupid, 
  "date"
)
values
(
  $1, 
  $2, 
  $3, 
  $4, 
  $5
)
RETURNING id,text,userid,username,groupid,date`;

export const addMessageToGroupQuery = `UPDATE groups SET messages = array_append(messages,$1) WHERE id = $2`;
