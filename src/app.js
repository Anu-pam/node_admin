const express=require('express');
const app= express();
app.use('/asset1',express.static('asset1'));
app.use(express.static(__dirname+'/asset1'));
app.set('view engine','ejs');
var bodyparser=require('body-parser');
var encoder=bodyparser.urlencoded();
var con=require('./db');
var dateTime = require('node-datetime');
const date = require('date-and-time');
const { query } = require('express');
const { state } = require('./db');
var jQuery = $ = require('jquery');
var dateFormat = require('dateformat');
var msg91 = require("msg91")("API_KEY", "SENDER_ID", "ROUTE_NO" );
const { base64encode, base64decode } = require('nodejs-base64');
const moment = require('moment');
con.connect(function(err){
    if(err) throw err;
});

app.get('/add_labour',function(req,res){
    res.render('add_role/add_labour.ejs');
}) 

   var name=req.body.name;
   var mobile=req.body.mobile;
   var state=req.body.state;
   var city=req.body.city;
   var district=req.body.district;
   var tehsil=req.body.tehsil;
   var address=req.body.address;  
   var zipcode=req.body.zipcode;
   var category=req.body.category; 
     
 })  

 app.get('/view_all_dealer',function(req,res){
     con.query("select * from dealer_web",function(error,result)
     {
         if(error) throw error;
         res.render('view_role/view_dealer',{data:result});
     })  
 
 }) 

 app.get('/dealer_more_button',function(req,res){
     var dealer_id=req.query['dealer_id'];
     con.query("select * from dealer_web JOIN state ON dealer_web.dealer_state=state.state_id JOIN city ON dealer_web.dealer_city=city.city_id where dealer_id="+dealer_id+"",function(error,result)
     {
         if(error) { throw error }
         else
         {
        // var paytime=result[0].payment_time;
        //  var time = moment(paytime*1000).format("DD-MM-YYYY h:mm:ss");
         // console.log(result);
         res.render('view_role/view_dealer_details',{data:result});
         }
        })    
     
 })  
 



 
 
    
app.listen(9000,()=>console.log('loading'));

 