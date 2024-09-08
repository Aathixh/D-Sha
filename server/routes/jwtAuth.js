const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validinfo');
const authorize = require('../middleware/authorization');
//registering
router.post('/register', validInfo, async (req, res) => {
    try {
      const { username, password, role } = req.body;
  
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (user.rows.length > 0) {
        return res.status(401).json('User already exists');
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      const newUser = await pool.query(
        'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
        [username, bcryptPassword, role]
      );
  
      const token = jwtGenerator(newUser.rows[0].id);
  
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
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
        return res.json({token});
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