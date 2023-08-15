const express = require('express')

const routerDispositivo = express.Router()

var pool = require('../../mysql-connector');
const { param } = require('../medicion');

routerDispositivo.get('/', function(req, res) {
    const _id = req.params.id; 
    pool.query(`Select * from Dispositivos where dispositivoId = '${_id}'`, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})



module.exports = routerDispositivo