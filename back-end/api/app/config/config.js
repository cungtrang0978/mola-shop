module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'hung9xpro', // yout password
    DB: 'fixdatajava', // your database name
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}