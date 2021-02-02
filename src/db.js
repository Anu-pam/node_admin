const mysql=require('mysql');
module.exports=mysql.createConnection({
    host:'localhost', 
    user:'root',
    password:'',
    database:'u891777119_labor',
    debug: false,
    multipleStatements: true
    })
