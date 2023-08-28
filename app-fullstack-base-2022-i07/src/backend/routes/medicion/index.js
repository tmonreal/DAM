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
    const formattedFecha = formatDateToDatabaseFormat(new Date(fecha));

    pool.query('INSERT INTO Log_Riegos (logRiegoId, apertura, fecha, electrovalvulaId) VALUES (?, ?, ?, ?)', 
        [logRiegoId, apertura, formattedFecha, electrovalvulaId], 
        function(err, result) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(200).send(result);
        });
});

routerMedicion.post('/new', function(req, res) {
    const { medicionId, fecha, valor, dispositivoId } = req.body;
    const formattedFecha = formatDateToDatabaseFormat(new Date(fecha));

    pool.query('INSERT INTO Mediciones (medicionId, fecha, valor, dispositivoId) VALUES (?, ?, ?, ?)', 
        [medicionId, formattedFecha, valor, dispositivoId], 
        function(err, result) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.status(200).send(result);
        });
});


function formatDateToDatabaseFormat(date) {
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const utcHours = date.getUTCHours();
    const hours = (utcHours - 3).toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
module.exports = routerMedicion