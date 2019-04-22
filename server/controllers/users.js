const express = require('express');
const user = require('../models/user');

const app = express.Router();

app.get("/", async (req, res, next) => {
    user.getAll()
    .then(x=>  res.send(x) )
    .catch(next)
});
app.get("/:id", (req, res, next) => {
    user.get(req.params.id)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.post("/", (req, res, next) => {
    user.add(req.body)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.post("/login", (req, res, next) => {
    //console.log({body: req.body})
    user.login(req.body.email, req.body.password)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.post("/facebookLogin", (req, res, next) => {
    //console.log({body: req.body})
    user.facebookLogin(req.body.token)
    .then(x=>  res.send(x) )
    .catch(next)
});
app.post("/changePassword", (req, res, next) => {
    user.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
    .then(x=>  res.send(x) )
    .catch(next)
});

module.exports = app;