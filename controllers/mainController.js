var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '021274',
    database : 'HSS403'
});

//load models

connection.connect(function(err){
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

exports.getPopChartData = function (req, res, next) {
    connection.query("SELECT `city`,`total_population`,`male`,`female` FROM `NewJerseypeoplebycity` WHERE city='Newark'", function(err, rows, fields) {
        if (!err) {
            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

exports.getNYGraphData = function (req, res, next) {
    connection.query("SELECT * FROM `Homeless_Population_By_Year_NY`", function(err, rows, fields) {
        if (!err) {
            //organize data to be ready for graphical display

            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

exports.getUnemploymentGraphData = function (req, res, next) {
    connection.query("SELECT `date`, `unemployment_rate` FROM `NewarkUnemploymentRate`", function(err, rows, fields) {
        if (!err) {
            //organize data to be ready for graphical display

            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

exports.getEconomicData = function (req, res, next) {
    connection.query("SELECT * FROM `NewarkEconomicData`", function(err, rows, fields) {
        if (!err) {
            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

exports.getHousingChart1Data = function (req, res, next) {
    connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function(err, rows, fields) {
        if (!err) {
            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

exports.getHousingChart2Data = function (req, res, next) {
    connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function(err, rows, fields) {
        if (!err) {
            res.send({results: rows});
        }
        else {
            console.log('Error while performing Query.');
        }
    });
}

