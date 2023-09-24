const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE
});
const sqd = 'SELECT email FROM users Where email = ?'
exports.register = (req,resp)=>{
    const { name , email , password , passwordConfirm} = req.body;

    
    db.query( sqd , [email] , async(error , results)=>{
         if (error){
            console.log("error in query")
         } 
         if(results.length > 0){
            return resp.render('register',{
                message : 'User is already registered'
            });
        }
            
         else if(password !== passwordConfirm){
            return resp.render('register',{
                message : 'password not matched'
            });
         }
         let hashedpasswd = await bcrypt.hash(password , 8);
         console.log(hashedpasswd);

         db.query('INSERT INTO users SET ?', {name : name , email : email , password : hashedpasswd},(error,results)=>{
                if(error){
                    console.log(error)
                } else{
                    console.log(results)
                    return resp.render('register',{
                        messagere : 'Registered Successfully'
                    });
                }
         })
    });
}
