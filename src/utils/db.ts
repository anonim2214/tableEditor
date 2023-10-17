const { Pool } = require('pg');

const pool = new Pool({
    user: 'user1',
    host: '51.250.107.83',
    database: 'table_editor',
    password: 'user1',
    port: 5432,
});

module.exports = pool;