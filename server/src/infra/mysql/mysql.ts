import config from 'config';
import mysql from 'mysql';

const MYSQL_CONFIG = config.get('MYSQL_CONFIG');

const queryMysqlData = (connection: mysql.Connection, sql: string, data?) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const mutateMysqlData = (connection: mysql.Connection, sql: string, data) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const getMysqlData = async (sql: string, data?) => {
  const connection = mysql.createConnection(MYSQL_CONFIG);
  connection.connect();
  const queryData = await queryMysqlData(connection, sql, data)
    .then(
      (queryData) => {
        return queryData;
      },
      (err) => {
        throw new Error(`runtime:${err}`);
      }
    )
    .finally(() => connection.end());
  return queryData;
};

export const postMysqlData = async (sql: string, data) => {
  const connection = mysql.createConnection(MYSQL_CONFIG);
  connection.connect();
  await mutateMysqlData(connection, sql, data)
    .catch((err) => {
      throw new Error(`runtime:${err}`);
    })
    .finally(() => connection.end());
};

// export const addMysqlData = async (sql: string, data) => {
//   const connection = mysql.createConnection(MYSQL_CONFIG);
//   connection.connect();
//   const mutatedData = await mutateMysqlData(connection, sql, data)
//     .then(
//       (queryData) => {
//         return queryData;
//       },
//       (err) => {
//         throw new Error(`runtime:${err}`);
//       }
//     )
//     .finally(() => connection.end());
//   return mutatedData;
// };
