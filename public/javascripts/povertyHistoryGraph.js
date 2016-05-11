$.ajax({
    type: "GET",
    url: '/povertyHistoryGraph',
    dataType: 'json'

}).done(function(resultObj) {

    //setup data
    var incomeAbvPL = [];
    var incomeBlwPL = [];
    var incomeAbvPLM = [];
    var incomeBlwPLM = [];
    var incomeAbvPLF = [];
    var incomeBlwPLF = [];
    var medHHIncome = [];
    var medGrossRent = [];

    for (var i=0; i<resultObj['results'].length; i++){
        var row = resultObj['results'][i];
        var field = row['field'];
        var year = row['year'];
        var index = year - 2008;

        switch(field){
            case 'Median household income':
                medHHIncome[index] = row['value'];
                break;
            case 'Median gross rent':
                medGrossRent[index] = row['value'];
                break;
            case 'Income in the past 12 months below poverty level':
                incomeBlwPL[index] = row['value'];
                break;
            case 'Income in the past 12 months below poverty level - Male':
                incomeBlwPLM[index] = row['value'];
                break;
            case 'Income in the past 12 months below poverty level - Female':
                incomeBlwPLF[index] = row['value'];
                break;
            case 'Income in the past 12 months at or above poverty level':
                incomeAbvPL[index] = row['value'];
                break;
            case 'Income in the past 12 months at or above poverty level - Male':
                incomeAbvPLM[index] = row['value'];
                break;
            case 'Income in the past 12 months at or above poverty level - Female':
                incomeAbvPLF[index] = row['value'];
                break;
        }
    }
    /*console.log(medHHIncome);
    console.log(medGrossRent);
    console.log(incomeBlwPL);
    console.log(incomeBlwPLM);
    console.log(incomeBlwPLF);
    console.log(incomeAbvPL);
    console.log(incomeAbvPLM);
    console.log(incomeAbvPLF);//*/

    $('#povertyHistoryGraph').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Income Above/Below Poverty Line, Household, & Rent Income'
        },
        xAxis: {
            categories: ['2008', '2009', '2010', '2011', '2012', '2013'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Income in past 12 months'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Median household income',
            data: medHHIncome
        }, {
            name: 'Median gross rent',
            data: medGrossRent
        }, {
            name: 'Income in the past 12 months below poverty level',
            data: incomeBlwPL
        }, {
            name: 'Income in the past 12 months below poverty level - Male',
            data: incomeBlwPLM
        }, {
            name: 'Income in the past 12 months below poverty level - Female',
            data: incomeBlwPLF
        }, {
            name: 'Income in the past 12 months at or above poverty level',
            data: incomeAbvPL
        }, {
            name: 'Income in the past 12 months at or above poverty level - Male',
            data: incomeAbvPLM
        }, {
            name: 'Income in the past 12 months at or above poverty level - Female',
            data: incomeAbvPLF
        }]
    });
});