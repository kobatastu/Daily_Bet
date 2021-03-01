import config from 'config';
import mysql from 'mysql';

const MYSQL_CONFIG = config.get('MYSQL_CONFIG');

const queryMysqlData = (connection: mysql.Connection, sql: string) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, data) => {
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

export const getMysqlData = async (sql: string) => {
  const connection = mysql.createConnection(MYSQL_CONFIG);
  connection.connect();
  const data = await queryMysqlData(connection, sql)
    .then(
      (data) => {
        return data;
      },
      (err) => {
        throw new Error(`runtime:${err}`);
      }
    )
    .finally(() => connection.end());
  return data;
};

export const postMysqlData = async (sql: string, data) => {
  const connection = mysql.createConnection(MYSQL_CONFIG);
  connection.connect();
  await mutateMysqlData(connection, sql, data).catch((err) => {
    throw new Error(`runtime:${err}`);
  });
  connection.end();
};
