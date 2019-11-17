"use strict";

const router = require("express").Router();
const app = require("../services/webexpress").app;
app.use("/", router);

router.get("/", async function (req, res, next) {
    res.status(200).send({
        error: false
    });
});

router.post("/answer/new", async function (req, res, next) {
    console.log(req.body);
    res.status(200).send({
        error: false
    });
});
