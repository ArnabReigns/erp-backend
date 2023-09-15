const express = require('express');
const router = express.Router();
const User = require('../../models/auth/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const useAuth = require('../../middleware/useAuth');


// Authentication

router.post('/register', async (req, res) => {

    const { username, password, role, name } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is missing' });
    if (!username) return res.status(400).json({ message: 'Username is missing' });
    if (!password) return res.status(400).json({ message: 'Password is missing' });

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    new User({ name, username, password, role })
        .save()
        .then((user) => {
            res.status(201).json({ message: "User created successfully", user: user });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        });
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username) return res.status(400).json({ message: 'Username is missing' });
    if (!password) return res.status(400).json({ message: 'Password is missing' });


    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({ message: 'Wrong Credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (isPasswordMatch) {
            return res.json({
                message: 'User logged in successfully',
                user: {
                    name: existingUser.name,
                    username: existingUser.username
                },
                jwt: jwt.sign({ username: existingUser.username }, process.env.SECRET)
            });
        }

        res.status(401).json({ message: 'Wrong Credentials' });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Some Internal Error Occurred' });
    }
});


// Users 

router.delete('/users', (req, res) => {

    if (req.query.except == 'admin') {
        return User.deleteMany({ role: { $ne: 'admin' } }).then((user) => res.json(user));
    }
    else if (req.query.except == 'user') {
        return User.deleteMany({ role: { $ne: 'user' } }).then((user) => res.json(user));
    }

    return User.deleteMany({}).then((user) => res.json(user));

})

router.get('/users', (req, res) => {
    User.find({}, '-password -__v').then((user) => res.json(user));
})

router.get('/getSignedUser', (req, res) => {
    res.json({ user: req.user });
})

module.exports = router;