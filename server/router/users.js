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
            res.json(data)
        }).
        catch(err => {
            res.sendStatus(404);
        });
    } catch (err) {
        console.error(err.stack);
        res.sendStatus(500);
    }
});

router.get('/:username', async(req, res) => {
    try {
        Users.findByUsername(req.params.username)
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.sendStatus(404);
            });
    }
    catch (err) {
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
            res.redirect('/');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
});

router.post('/:username', async (req, res) => {
    const body = req.body;
    body.messages = JSON.parse(body.messages);
    body.depthChartPosition = JSON.parse(body.depthChartPosition);
    if (!body || !body.username || !body.password) {
        res.status(400).send('Invalid body');
    } else {
        const edited = await Users.edit(body.username, body);
        if (edited) {
            res.redirect('/');
        } else {
            res.status(500).send("I don't know what happened but it didn't create the user");
        }
    }
});

router.post('/create/message', async (req, res) => {
    const body = req.body;
    if (!body) {
        res.status(400).send('Invalid body');
    } else {
        const sent = await Users.sendMessage(body.position, body);
        if (sent) {
            res.redirect('/');
        } else {
            res.status(500).send("An error occurred");
        }
    }
});

router.get('/:username/message/:messageid', async (req, res) => {
    const username = req.params.username;
    const messageid = req.params.mesasgeid;
    if (!username || !messageid) {
        res.status(400).send('Invalid');
    }
    else {
        const messageRead = await Users.messageRead(username, messageid);
        if (messageRead) {
            res.send(true);
        } else {
            res.status(500).send("An error occurred");
        }
    }
});