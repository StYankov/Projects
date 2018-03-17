const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', function (req, res) {
    const body = req.body;

    if (!body.email || !body.password || !body.passwordRepeat)
        return res.status(400).send({ error: "Missing field" });

    if (body.password !== body.passwordRepeat) return res.status(400).send({ error: "Passwords don't match " });

    User.findOne({ email: body.email }).exec(function (err, user) {
        if (err) res.status(400).send({ error: err });
        if (user) res.status(400).send({ error: "Имейлът съществува" });

        const newUser = new User();
        newUser.email = body.email;
        newUser.salt = newUser.generateSalt();
        newUser.hash = newUser.hashPassword(body.password, newUser.salt);
        newUser.save();

        return res.status(201)
            .json({ token: jwt.sign({ id: newUser._id }, 'averiprivate') });
    });
});

router.post('/login', function (req, res) {
    const body = req.body;

    if (!body.email || !body.password)
        return res.status(400).send({ error: "Missing field" });

    User.findOne({ email: body.email })
        .exec(function (err, user) {
            if (err) res.status(400).send({ error: err })
            if (!user) res.status(404).send({ error: "User not found" })

            if (User.validPassword(body.password, user.hash)) {
                res.status(200).send({ token: jwt.sign({ id: user._id }, 'averiprivate') });
            }
            else {
                res.status(400).send({ error: "Wrong credentials" });
            }
        })
});

module.exports = router;
