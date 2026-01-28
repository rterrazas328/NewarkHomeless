//var mysql = require('mysql');
import mysql2 from 'mysql2/promise';
import LRU from 'lru-cache';

console.log(process.env.DB_USER);

const mysql2Pool = mysql2.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : 'hss_newark',
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

/*var pool = mysql.createPool({
    host     : process.env.DB_HOST,//'us-cdbr-iron-east-04.cleardb.net',
    user     : process.env.DB_USER,//'b0a538b423b097',//HSS_public
    password : process.env.DB_PASSWORD,//'073bb642',//beaches_5@ndY_Cj3#
    database : 'hss_newark'//'heroku_b5ae7a8579f1d0a'
});//*/

//var LRU = require("lru-cache");
var options = { max: 1500
    , length: function (n, key) { return n * 2 + key.length }
    , dispose: function (key, n) { n.close() }
    , maxAge: 1000 * 60 * 60 };
var cache = LRU(50);

export function getIndex(req, res, next){
    res.render('index', { title: 'index' });
}

export function getGraphs(req, res, next) {
    res.render('graphs', { title: 'graphs' });
}
export function getSources(req, res, next) {
    res.render('sources', { title: 'sources' });
}

export async function getPopChartData(req, res, next) {

    var hit = cache.get("pop_chart");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{
        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT `city`,`total_population`,`male`,`female` FROM `NewJerseypeoplebycity` WHERE city='Newark'"
            );
            var pObj = {list : rows};
            cache.set("pop_chart", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err)
        {
            console.log(err);
        }

        /*pool.getConnection(function(err, connection) {

            if (!err){
                connection.query("SELECT `city`,`total_population`,`male`,`female` FROM `NewJerseypeoplebycity` WHERE city='Newark'", function (err, rows, fields) {
                    if (!err) {
                        var pObj = { list : rows};
                        //console.log(pObj);
                        cache.set("pop_chart", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query: ' + err);
                    }
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

export async function getNYGraphData(req, res, next) {

    var hit = cache.get("NY_graph");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{
        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT * FROM `Homeless_Population_By_Year_NY`"
            );
            var pObj = { list : rows};
            cache.set("NY_graph", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err) {
            console.log(err);
        }
        /*pool.getConnection(function(err, connection) {

            if (!err) {
                connection.query("SELECT * FROM `Homeless_Population_By_Year_NY`", function (err, rows, fields) {
                    if (!err) {
                        //organize data to be ready for graphical display
                        var pObj = { list : rows};
                        cache.set("NY_graph", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query: ' + err);
                    }
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

export async function getUnemploymentGraphData(req, res, next) {

    var hit = cache.get("unemp_graph");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{

        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT `date`, `unemployment_rate` FROM `NewarkUnemploymentRate`"
            );
            var pObj = { list : rows};
            cache.set("unemp_graph", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err) {
            console.log(err);
        }


        /*pool.getConnection(function(err, connection) {
            if (!err) {
                connection.query("SELECT `date`, `unemployment_rate` FROM `NewarkUnemploymentRate`", function (err, rows, fields) {
                    if (!err) {
                        //organize data to be ready for graphical display
                        var pObj = { list : rows};
                        cache.set("unemp_graph", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query: ' + err);
                    }
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

export async function getEconomicData(req, res, next) {

    var hit = cache.get("econData");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{

        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT * FROM `NewarkEconomicData`"
            );
            var pObj = { list : rows};
            cache.set("econData", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err) {
            console.log(err);
        }

        /*pool.getConnection(function(err, connection) {

            if (!err) {
                connection.query("SELECT * FROM `NewarkEconomicData`", function (err, rows, fields) {
                    //console.log(rows);
                    if (!err) {
                        var pObj = { list : rows};
                        cache.set("econData", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query: ' + err);
                    }
                    //connection.release();
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

export async function getHousingChart1Data(req, res, next) {

    var hit = cache.get("housingData1");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{

        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT * FROM `NewarkNewJerseyHousing`"
            );
            var pObj = { list : rows};
            cache.set("housingData1", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err) {
            console.log(err);
        }

        /*pool.getConnection(function(err, connection) {

            if (!err) {
                connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function (err, rows, fields) {
                    if (!err) {
                        var pObj = { list : rows};
                        cache.set("housingData1", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query:' + err);
                    }
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

export async function getHousingChart2Data(req, res, next) {
    var hit = cache.get("housingData2");

    if ( hit != undefined) {//cache hit
        var pObj = JSON.parse(hit);
        var rows = pObj['list'];
        res.send({results: rows});
    }
    else{

        try {
            const [rows, fields] = await mysql2Pool.query(
                "SELECT * FROM `NewarkNewJerseyHousing`"
            );
            var pObj = { list : rows};
            cache.set("housingData2", JSON.stringify(pObj));
            res.send({results: rows});
        }
        catch (err) {
            console.log(err);
        }

        /*pool.getConnection(function(err, connection) {
            if (!err) {
                connection.query("SELECT * FROM `NewarkNewJerseyHousing`", function (err, rows, fields) {
                    if (!err) {
                        var pObj = { list : rows};
                        cache.set("housingData2", JSON.stringify(pObj));
                        res.send({results: rows});
                    }
                    else {
                        console.log('Error while performing Query: ' + err);
                    }
                });
                connection.release();
            }
            else{
                console.log('Error while getting connection: ' + err);
            }
        });//*/
    }
}

