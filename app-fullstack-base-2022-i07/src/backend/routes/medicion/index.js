const express = require('express')

const routerMedicion = express.Router()

var pool = require('../../mysql-connector');

routerMedicion.get('/', function(req, res) {
    pool.query('Select * from Mediciones', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerMedicion