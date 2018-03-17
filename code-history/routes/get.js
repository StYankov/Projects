var express = require('express');
var router = express.Router();
var Code = require('../models/Code');

router.get('/code', function(req, res) {
    Code.find({}).limit(5)
        .then(data => res.status(200).send({ data }))
        .catch(error => res.status(404).send({ error: 'an error occurred' }));
});

router.get('/code/:id', function(req, res){
    const params = req.params;

    Code.findById(params.id)
        .then(response => res.send(response))
        .catch(e => res.status(404).send({ error: "Не намерен"}));
});

module.exports = router;