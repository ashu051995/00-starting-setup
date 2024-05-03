const mysql =require('mysql2')
const Sequelize = require('sequelize')
const sequelize = new Sequelize('node_complete','root','admin',{dialect:'mysql',host:'localhost'})
//there ARE 2 WAY TO CONNECT 

module.exports= sequelize;