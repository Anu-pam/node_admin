const express=require('express');
var con=require('./db');
let res;
function save(table)
{
    // console.log(s);
   con.query("select * from "+table+"",function(error,result){
    if(error) throw error;   
      res=result;
    // console.log(res);
    //    result;
    })
    return res;
} 
 
module.exports=save;