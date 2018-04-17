'use strict';
const db            = require('../database')('player_manager');
const passport      = require('passport');
const Users         = require('../controller/Users')(db);
const Router        = require('express').Router;

const router = new Router();
module.exports = router;

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    if (req.user) req.logout();
    res.redirect('/');
});

router.get('/exists/:username', async (req, res) => {
    try {
        const found = await Users.exists(req.params.username);
        found
            ? res.sendStatus(200)
            : res.sendStatus(404);
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

router.get('/players', async (req, res) => {
    try {
        Users.players()
        .then(data => {
            data
            ? res.json(data)
            : res.sendStatus(404);
        });
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || !body.username || !body.password) {
        res.status(400).send('Invalid body');
    } else {
        const created = await Users.create(body);
        if (created) {
            res.status(200).send('User created');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
});

router.put('/:username', async (req, res) => {
    const body = req.body;
    if (!body || !body.username || !body.password) {
        res.status(400).send('Invalid body');
    } else {
        const edited = await Users.edit(body.username, body);
        if (edited) {
            res.status(200).send('User created');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
})