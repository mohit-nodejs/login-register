const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASS,
    database : process.env.DATABASE
});


exports.login = (req,res)=>{
    const {email , password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }
        if (results.length === 0) {
          return res.status(401).render('login', { error: 'Invalid email or password' });
        }
    
        
        const hashedpasswd = results[0].password;
        bcrypt.compare(password, hashedpasswd, (bcryptErr, passwordMatch) => {
            if (bcryptErr) {
              console.error(bcryptErr);
              return res.status(500).send('Server error');
            }
      
            if (passwordMatch) {
              return res.render('welcome',{
                messagelo : 'Login Successfully'
            }); 
            } else {
              
              return res.status(401).render('login', { error: 'Invalid username or password' });
            }
          });
        });

}