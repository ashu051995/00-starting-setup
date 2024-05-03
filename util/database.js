const mysql =require('mysql2')
//there ARE 2 WAY TO CONNECT 

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node_complete',
    password:'admin'
})
module.exports= pool.promise();