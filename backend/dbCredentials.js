import env from './env.js';

let {
  dbHost: host, dbPort: port, dbUser: user,
  dbPw: password, dbDb: database
} = env;

// pw should be string even if only containing numbers
password += '';

// export dbCredentials (read from environment variables)
export default { host, port, user, password, database };