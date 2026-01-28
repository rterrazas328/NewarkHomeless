$.ajax({
    type: "GET",
    url: '/NYGraph',
    dataType: 'json'

}).done(function(resultObj) {
    //create categories
    var xCategories = [];
    var c = 0;
    for (var i=0; i<8; i++){
        var row = resultObj['results'][i];
        if (row['year'] == 2012){
            var label = row['area'];
            label = label.replace('Surface Area - ', '');
            xCategories[c] = label;
            c++;
        }
    }

    var year2012 = [];
    for (var j=0; j<resultObj['results'].length; j++){
        var row = resultObj['results'][j];
        if (row['year'] == 2012){
            var label = row['area'];
            label = label.replace('Surface Area - ', '');
            switch(label){
                case 'Manhattan ':
                    year2012[0] = row['homeless_estimates'];
                    break;
                case 'Total Unsheltered Individuals ':
                    year2012[1] = row['homeless_estimates'];
                    break;
                case 'Subways ':
                    year2012[2] = row['homeless_estimates'];
                    break;
                case 'Surface Total ':
                    year2012[3] = row['homeless_estimates'];
                    break;
                case 'Staten Island ':
                    year2012[4] = row['homeless_estimates'];
                    break;
                case 'Queens ':
                    year2012[5] = row['homeless_estimates'];
                    break;
                case 'Brooklyn ':
                    year2012[6] = row['homeless_estimates'];
                    break;
                case 'Bronx ':
                    year2012[7] = row['homeless_estimates'];
                    break;
            }
        }
    }

    var year2011 = [];
    for (var k=0; k<resultObj['results'].length; k++){
        var row = resultObj['results'][k];
        if (row['year'] == 2011){
            var label = row['area'];
            label = label.replace('Surface Area - ', '');
            switch(label){
                case 'Manhattan ':
                    year2011[0] = row['homeless_estimates'];
                    break;
                case 'Total Unsheltered Individuals ':
                    year2011[1] = row['homeless_estimates'];
                    break;
                case 'Subways ':
                    year2011[2] = row['homeless_estimates'];
                    break;
                case 'Surface Total ':
                    year2011[3] = row['homeless_estimates'];
                    break;
                case 'Staten Island ':
                    year2011[4] = row['homeless_estimates'];
                    break;
                case 'Queens ':
                    year2011[5] = row['homeless_estimates'];
                    break;
                case 'Brooklyn ':
                    year2011[6] = row['homeless_estimates'];
                    break;
                case 'Bronx ':
                    year2011[7] = row['homeless_estimates'];
                    break;
            }
        }
    }

    var year2010 = [];
    for (var l=0; l<resultObj['results'].length; l++){
        var row = resultObj['results'][l];
        if (row['year'] == 2010){
            var label = row['area'];
            label = label.replace('Surface Area - ', '');
            switch(label){
                case 'Manhattan ':
                    year2010[0] = row['homeless_estimates'];
                    break;
                case 'Total Unsheltered Individuals ':
                    year2010[1] = row['homeless_estimates'];
                    break;
                case 'Subways ':
                    year2010[2] = row['homeless_estimates'];
                    break;
                case 'Surface Total ':
                    year2010[3] = row['homeless_estimates'];
                    break;
                case 'Staten Island ':
                    year2010[4] = row['homeless_estimates'];
                    break;
                case 'Queens ':
                    year2010[5] = row['homeless_estimates'];
                    break;
                case 'Brooklyn ':
                    year2010[6] = row['homeless_estimates'];
                    break;
                case 'Bronx ':
                    year2010[7] = row['homeless_estimates'];
                    break;
            }
        }
    }
    var year2009 = [];
    for (var m=0; m<resultObj['results'].length; m++){
        var row = resultObj['results'][m];
        if (row['year'] == 2009){
            var label = row['area'];
            label = label.replace('Surface Area - ', '');
            switch(label){
                case 'Manhattan ':
                    year2009[0] = row['homeless_estimates'];
                    break;
                case 'Total Unsheltered Individuals ':
                    year2009[1] = row['homeless_estimates'];
                    break;
                case 'Subways ':
                    year2009[2] = row['homeless_estimates'];
                    break;
                case 'Surface Total ':
                    year2009[3] = row['homeless_estimates'];
                    break;
                case 'Staten Island ':
                    year2009[4] = row['homeless_estimates'];
                    break;
                case 'Queens ':
                    year2009[5] = row['homeless_estimates'];
                    break;
                case 'Brooklyn ':
                    year2009[6] = row['homeless_estimates'];
                    break;
                case 'Bronx ':
                    year2009[7] = row['homeless_estimates'];
                    break;
            }
        }
    }//*/
    /*console.log(xCategories);
    console.log(year2012);
    console.log(year2011);
    console.log(year2010);
    console.log(year2009);//*/

    //$(function () {
        $('#NYGraph').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Homeless Population By Year in New York'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: xCategories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'number of people'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: '2012',
                data: year2012

            }, {
                name: '2011',
                data: year2011

            }, {
                name: '2010',
                data: year2010

            }, {
                name: '2009',
                data: year2009

            }]
        });
    //});//*/
});