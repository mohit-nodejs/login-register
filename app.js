const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const app = express();
const publicPath = path.join(__dirname,'./public');
const mysql = require('mysql');



dotenv.config({path : './.env'});

app.use(express.static(publicPath));
//for url-encoded bodies
app.use(express.urlencoded({ extended: false }));
// for json bodies
app.use(express.json());

app.set('view engine', 'hbs')

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE
});

db.connect((error)=>{
    if(error){
        console.log('Error in connecting databases..')
    }
    else{
        console.log('sql db connected.......')
    }
})

//routes
 app.use('/', require('./routes/pages'));
 app.use('/auth', require('./routes/auth'));
 app.use('/authv', require('./routes/authv'));

app.listen(5000 , ()=>{
    console.log('app is running on port 5000')
})
