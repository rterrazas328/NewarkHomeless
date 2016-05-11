var mysql = require('mysql');
//Heroku Setup

var pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b0a538b423b097',
    password : '073bb642',
    database : 'heroku_b5ae7a8579f1d0a'
});//*/
//Old heroku setup
/*var connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-04.cleardb.net',
    user     : 'b0a538b423b097',
    password : '073bb642',
    database : 'heroku_b5ae7a8579f1d0a'
});//*/

//local setup
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '021274',
    database : 'HSS403'
});//*/

//load models

/*connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
});//*/

exports.getIndex = function(req, res, next){
    res.render('index', { title: 'index' });
}

exports.getGraphs = function (req, res, next) {
    res.render('graphs', { title: 'graphs' });
}
exports.getSources = function (req, res, next) {
    res.render('sources', { title: 'sources' });
}

exports.getPopChartData = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT `city`,`total_population`,`male`,`female` FROM `NewJerseypeoplebycity` WHERE city='Newark'", function (err, rows, fields) {
            if (!err) {
                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

exports.getNYGraphData = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM `Homeless_Population_By_Year_NY`", function (err, rows, fields) {
            if (!err) {
                //organize data to be ready for graphical display

                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

exports.getUnemploymentGraphData = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT `date`, `unemployment_rate` FROM `NewarkUnemploymentRate`", function (err, rows, fields) {
            if (!err) {
                //organize data to be ready for graphical display

                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

exports.getEconomicData = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM `NewarkEconomicData`", function (err, rows, fields) {
            if (!err) {
                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

exports.getHousingChart1Data = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function (err, rows, fields) {
            if (!err) {
                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

exports.getHousingChart2Data = function (req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function (err, rows, fields) {
            if (!err) {
                res.send({results: rows});
            }
            else {
                console.log('Error while performing Query.');
            }
        });
        connection.release();
    });
}

