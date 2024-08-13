const express = require('express');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// User Schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// Signup route
app.post('/api/signup', async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, username }); // Include the username in the response
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Fetch user details route
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password from the response
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});


app.get('/api/visibility', async (req, res) => {
    const { location } = req.query;
    try {
        const geoResponse = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: location,
                key: process.env.OPENCAGE_API_KEY
            }
        });

        if (geoResponse.data.results.length === 0) {
            return res.status(404).json({ error: 'Location not found' });
        }

        const { lat, lng } = geoResponse.data.results[0].geometry;

        const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat,
                lon: lng,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        const visibility = weatherResponse.data.visibility; // Visibility in meters
        const visibilityKilometers = visibility / 1000; // Convert meters to kilometers
        const visibilityPercentage = (visibilityKilometers / 100) * 100; // Assuming 10 km as 100%
        const weather = weatherResponse.data.weather[0].main;
        const clouds = weatherResponse.data.clouds.all;
        const windSpeed = weatherResponse.data.wind.speed;

        res.json({
            visibility: visibilityPercentage.toFixed(2), // Return visibility percentage
            coordinates: [lng, lat],
            weather: weather,
            clouds: clouds,
            windSpeed: windSpeed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


// Redirect to login if trying to access stargazing.html directly without token
app.get('/stargazing.html', (req, res) => {
    res.redirect('/login.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
