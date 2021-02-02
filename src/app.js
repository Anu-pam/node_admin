const express=require('express');
const app= express();
app.use('/asset1',express.static('asset1'));
app.use(express.static(__dirname+'/asset1'));
app.set('view engine','ejs');
var bodyparser=require('body-parser');
var encoder=bodyparser.urlencoded();
const router=express.Router();
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
const routes = require('./routes');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const {check,validationResult}=require('express-validator');
con.connect(function(err){
    if(err) throw err;
});

app.use(session({
    secret: 'PjEvPjIpOi0yPg==',
    resave: false,
    saveUninitialized: true
  }));

app.use('/',routes);
app.use('/add_labour1',routes);
app.use('/add_labour',routes);
app.use('/addLabour',routes);
app.use('/fetch_city',routes);
app.use('/register/labour',routes);
app.use('/add_book_and_enquiry',routes);
//========================profile================================
app.use('/profile',routes);
//========================profile end ================================

// ======================view start====================================

app.use('/view_all_dealer',routes);
app.use('/dealer_more_button',routes);
app.use('/view_all_labour',routes);
app.use('/labour_more_button',routes);
app.use('/view_all_franchisee',routes);
app.use('/franchisee_more_button',routes);
app.use('/view_all_cityfranchisee',routes);
app.use('/cityfranchisee_more_button',routes);

// ===================== VIEW END=========================================
// ====================TRANSACTION START==================================

app.get('/dealer_transaction',function(req,res){
 con.query("SELECT * FROM `transaction`  WHERE `user_id` LIKE '%D%'",function(error,result){
    if(error) throw error;
    else
    {
        // console.log(result);
        res.render('transaction/dealer_transaction',{data:result});
    }
})
});
app.get('/franchisee_transaction',function(req,res){
    con.query("SELECT * FROM `transaction`  WHERE `user_id` LIKE '%F%'",function(error,result){
       if(error) throw error;
       else
       {
            res.render('transaction/franchisee_transaction',{data:result});
       }
   })
   });
app.get('/cityfranchisee_transaction',function(req,res){
    con.query("SELECT * FROM `transaction`  WHERE `user_id` LIKE '%CF%'",function(error,result){
       if(error) throw error;
       else
       {
           res.render('transaction/cityfranchisee_transaction',{data:result});
       }
   })
   });
 
// ====================TRANSACTION END====================================
//==============logout============
app.use('/userlogout',routes);
//==================logout======== 
    
app.listen(9000,()=>console.log('loading'));
 
  