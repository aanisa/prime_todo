var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
    database: 'chi',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 3000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else {
            db.query('SELECT * FROM "tasks" ORDER BY "id" DESC', function(queryError, result) {
                done();
                if (queryError) {
                    console.log('Error making query!');
                    res.send(500);
                } else {
                    res.send(result.rows);
                    // console.log(result.rows);
                }
            });
        }
    });
});//end get


router.post('/add', function(req, res) {
    // console.log(req.body);
    var task = req.body.task;
    var status = req.body.status;
    // console.log(task);
    // console.log(status);

    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else {
            db.query('INSERT INTO "tasks" ("task", "status")' +
                'VALUES ($1, $2)',
                [task, status],
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query!');
                        res.send(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});//end post


router.put('/complete', function(req, res) {
    var id = req.body.id;
    var status = req.body.status;

    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else {
            db.query('UPDATE "tasks" SET "status" = $1 WHERE "id" = $2',
                [status, id],
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query!');
                        res.send(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});//end put


router.delete('/delete:id/', function(req, res) {
    var id = req.params.id;
    console.log("will delete task" + id);

    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log("Error connecting to database!");
            res.send(500);
        } else {
            db.query('DELETE FROM "tasks" WHERE "id" = $1',
                [id],
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query!');
                        res.send(500);
                    } else {
                        res.send('Task Deleted');
                    }
                });
        }
    });
});//end delete




module.exports = router;
