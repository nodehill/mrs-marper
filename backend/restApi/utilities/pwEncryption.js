import bcrypt from 'bcrypt';
import env from '../../env.js';
const {
  bcryptSaltRounds: rounds,
  userTable,
  userPwColumn,
  userUserroleColumn,
  userDefaultUserrole
} = env;

// encrypt a password to a hash using bcrypt
const encryptPassword = async password =>
  await bcrypt.hash(password, rounds);

// compare unencrypted password with encrypted hash
export const comparePassword = async (password = '', hash = '') =>
  await bcrypt.compare(password, hash);

// modify the request body with encrypted password on user table
export const modifyReqBody = async (tableName, body) => {
  if (tableName !== userTable) { return body; }
  return {
    ...body,
    [userPwColumn]: await encryptPassword(body[userPwColumn]),
    [userUserroleColumn]: userDefaultUserrole
  }
}