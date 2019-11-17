"use strict";

const router = require("express").Router();
const app = require("../services/webexpress").app;
const database = require("../services/database").db;
const Answer = database.model("Answer");
const Option = database.model("Option");
const Form = database.model("Form");
const Utils = require("../services/utils");
app.use("/", router);

router.get("/", async function (req, res, next) {
    res.status(200).send(Utils.transform(await Form.getAll()));
});

// let parsedJSON = require('../models/options.json');
// for (let i of parsedJSON){
//     let option = new Option(i);
//     option.save();
// }

router.post("/answer/new", async function (req, res, next) {
    let answers = [];
    let company;
    let summary = 0;
    for (let rawAnswer of JSON.parse(req.body.data).slice(0, 9)) {
        if (rawAnswer.title === "Компания")
            company = rawAnswer.answer;
        else if (rawAnswer.answer instanceof Array) {
            let summ = 0;
            for (let i of rawAnswer.answer)
                summ += await Option.getPoint(i) * 50;
            if (summ >= 60)
                summ = 2;
            else if (summ > 0)
                summ = 1;
            else summ = 0;
            let answer = new Answer({
                isGroup: true,
                question: rawAnswer.title,
                answer: rawAnswer.answer.join('#'),
                point: summ
            });
            summary += summ;
            answer.save();
            answers.push(answer);
        } else {
            let summ = await Option.getPoint(rawAnswer.answer);
            let answer = new Answer({
                isGroup: false,
                question: rawAnswer.title,
                answer: rawAnswer.answer.toString(),
                point: summ
            });
            summary += summ;
            answer.save();
            answers.push(answer);
        }
    }
    let form = new Form({
        company: company,
        answers: answers,
        summary: summary / answers.length,
    });
    form.save();
    res.status(200).send({
        error: false
    });
});
