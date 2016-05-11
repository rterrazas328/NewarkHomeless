var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.getIndex);
router.get('/graphs', mainController.getGraphs);
router.get('/popChart', mainController.getPopChartData);
router.get('/sources', mainController.getSources);

router.get('/NYGraph', mainController.getNYGraphData);
router.get('/unemploymentGraph', mainController.getUnemploymentGraphData);
router.get('/povertyHistoryGraph', mainController.getEconomicData);
router.get('/povertyAgeGraph', mainController.getEconomicData);
router.get('/housingChart1', mainController.getHousingChart1Data);
router.get('/housingChart2', mainController.getHousingChart2Data);

module.exports = router;
