const express = require('express')

const routerMedicion = express.Router()

var pool = require('../../mysql-connector');

routerMedicion.get('/medicion/:id', function(req, res) {

    const _id = req.params.id; 
    
    pool.query(`Select * from Mediciones where dispositivoId = '${_id}'`, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

module.exports = routerMedicion