var express = require('express');
var router = express.Router();
var Code = require('../models/Code');

router.post('/code/', function (req, res, next) {
    const body = req.body;
    
    if (!body.code)
        return res.status(400).send({ error: "Missing code field" });
    if (!body.syntax)
        return res.status(400).send({ error: "Missing syntax field" });

    const codeBody = {
        code: String(body.code),
        syntax: String(body.syntax)
    };
    if (body.name)
        codeBody.name = String(body.name);
    
    Code.create(codeBody)
        .then(response => res.status(201).send({ data: response }))
        .catch(errro => res.status(400).send({ error }));

});

module.exports = router;