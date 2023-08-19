const express = require('express')

const routerMedicion = express.Router()

var pool = require('../../mysql-connector');

routerMedicion.get('/:id', function(req, res) {
    
    pool.query(`Select * from Mediciones where dispositivoId = ?`, [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMedicion.get('/last/:id', function(req, res) {
    
    pool.query(`Select * from Mediciones where dispositivoId = ? order by fecha desc limit 1`, [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})


routerMedicion.get('/', function(req, res) {
    
    pool.query(`Select * from Mediciones`, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMedicion.get('/logRiegos/:id', function(req, res) {
    
    pool.query(`Select * from Log_Riegos where electrovalvulaId = ?`, [req.params.id], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMedicion.post('/logRiegos/new', function(req, res) {
    const { logRiegoId, apertura, fecha, electrovalvulaId } = req.body;

    pool.query('INSERT INTO Log_Riegos (logRiegoId, apertura, fecha, electrovalvulaId) VALUES (?, ?, ?, ?)', 
        [logRiegoId, apertura, fecha, electrovalvulaId], 
        function(err, result) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(200).send(result);
        });
});


module.exports = routerMedicion