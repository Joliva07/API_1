

const env = {
  database: 'umg_ejercicio_2403',
  username: 'elmerousuario',
  password: 'AgPH2Qi84ItuTiWlyLezy3dhkOwLEisg',
  host: 'dpg-cqc7lpeehbks738amlkg-a.oregon-postgres.render.com',
  //host: 'dpg-cqc7lpeehbks738amlkg-a',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;