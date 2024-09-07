const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorize = require('../middleware/authorization');
//registering
router.post('/register',async(req,res)=>{
    try {
        //1. destructure the req.body (name,email,role)
        const {username,password} = req.body;
        //2. check if user exists (if user exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if(user.rows.length!==0){
            return res.status(401).send("User already exists");
        }
        //3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);
        //4. Enter the new user inside our database
        const newUser = await pool.query("INSERT INTO users (username,password,role) VALUES ($1,$2,'admin') RETURNING *",[username,bcryptPassword]);
        //5. Generating our jwt token
        const token = jwtGenerator(newUser.rows[0].username);
        res.json({token});
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
//login route
router.post('/login',async(req,res)=>{
    try {
        //1. destructure the req.body
        const {username,password} = req.body;
        //2. check if user doesn't exist(if not then throw error)
        const user = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if(user.rows.length===0){
            return res.status(401).send("Password or Username is incorrect");
        }
        //3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password,user.rows[0].password);
        if(!validPassword){
            return res.status(401).send("Password or Username is incorrect");
        }
        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].username);
        res.json({token});
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
router.get('/is-verify',authorize,async(req,res)=>{
    try {
        res.json(true);
    } catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;