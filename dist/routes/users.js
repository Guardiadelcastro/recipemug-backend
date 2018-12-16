"use strict";
const express = require("express");
const passport = require("passport");
const UserController_1 = require("../controllers/UserController");
const router = express.Router();
router.post('/register', (req, res) => {
    UserController_1.registerUser(req.body).then(message => { res.send(message); })
        .catch(err => { res.status(500).send(err); });
});
router.get('/:id', (req, res) => {
    UserController_1.getUser(req.params.id).then((user) => res.json(user))
        .catch((err) => res.status(500).send(err));
});
router.delete('/:id', (req, res) => {
    UserController_1.deleteUser(req.params.id).then((message) => res.send(message))
        .catch((err) => res.status(500).send(err));
});
router.get('/', (req, res) => {
    UserController_1.getAllUsers().then((users) => { res.json(users); })
        .catch((err) => { res.status(500).send(err); });
});
// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/auth', (req, res) => {
    UserController_1.userAuthentication(req.body).then((user) => { res.json(user); })
        .catch((err) => { res.status(500).send(err); });
});
router.get('/dashboard', passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    const user = req.user;
    res.send('It worked! User id is: ' + user._id + '.');
});
module.exports = router;
