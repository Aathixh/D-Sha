const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const authorize = require('../middleware/authorization');
const validInfo = require('../middleware/validinfo');
const jwtGenerator = require('../utils/jwtGenerator');
// Add User
router.post('/user', validInfo, async (req, res) => {
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
      res.status(500).json({message:'Server Error'});
    }
  });
  
  // Remove User
  router.delete('/user', authorize, async (req, res) => {
    try {
      const { username } = req.body;
  
      const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User removed successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({message:'Server Error'});
    }
  });
// Add Bus
router.post('/bus', authorize, async (req, res) => {
  try {
    const { busNumber, capacity } = req.body;
    const newBus = await pool.query(
      'INSERT INTO buses (bus_number, capacity) VALUES ($1, $2) RETURNING *',
      [busNumber, capacity]
    );
    res.json(newBus.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Remove Bus
router.delete('/bus', authorize, async (req, res) => {
  try {
    const { busNumber } = req.body;
    const result = await pool.query('DELETE FROM buses WHERE bus_number = $1 RETURNING *', [busNumber]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Add Bus Stop
router.post('/bus-stop', authorize, async (req, res) => {
    try {
        const { routeId, name, latitude, longitude, sequenceNumber } = req.body;
        const newBusStop = await pool.query(
            'INSERT INTO bus_stops (route_id, name, latitude, longitude, sequence_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [routeId, name, latitude, longitude, sequenceNumber]
        );
        res.json(newBusStop.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message:'Server Error'});
    }
});

// Remove Bus Stop
router.delete('/bus-stop', authorize, async (req, res) => {
  try {
    const { stopName } = req.body;
    const result = await pool.query('DELETE FROM bus_stops WHERE name = $1 RETURNING *', [stopName]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bus stop not found' });
    }
    res.json({ message: 'Bus stop removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Add Route
router.post('/route', async (req, res) => {
  try {
    const { routeName, startLocation, endLocation } = req.body;
    const newRoute = await pool.query(
      'INSERT INTO routes (name, start_point, end_point) VALUES ($1, $2, $3) RETURNING *',
      [routeName, startLocation, endLocation]
    );
    res.json(newRoute.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Remove Route
router.delete('/route', async (req, res) => {
  try {
    const { routeName } = req.body;
    const result = await pool.query('DELETE FROM routes WHERE name = $1 RETURNING *', [routeName]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.json({ message: 'Route removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Add Schedule
router.post('/schedule', async (req, res) => {
  try {
    const { routeId, busId, driverId, conductorId, startTime, endTime } = req.body;
    const newSchedule = await pool.query(
      'INSERT INTO schedules (route_id, bus_id, driver_id, conductor_id, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [routeId, busId, driverId, conductorId, startTime, endTime]
    );
    res.json(newSchedule.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

// Remove Schedule
router.delete('/schedule', async (req, res) => {
  try {
    const { scheduleId } = req.body;
    const result = await pool.query('DELETE FROM schedules WHERE id = $1 RETURNING *', [scheduleId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message:'Server Error'});
  }
});

module.exports = router;