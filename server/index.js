const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register and Login Routes
app.use('/auth', require('./routes/jwtAuth'));

// Dashboard route
app.use('/dashboard', require('./routes/dashboard'));

// Manage entities route
app.use('/manage', require('./routes/manageEntities'));

const path = require('path');

// Serve static files from the 'web' folder
app.use(express.static(path.join(__dirname, '../web')));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});