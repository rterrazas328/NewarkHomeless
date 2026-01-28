
    $.ajax({
        type: "GET",
        url: '/popChart',
        dataType: 'json'

    }).done(function(resultObj) {
        var popChartData = resultObj['results'];
        console.log(popChartData);

        //$(function () {

            //$(document).ready(function () {

                // Build the chart
                $('#popChart').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Newark\'s Population ( Total '+popChartData[0]['total_population']+' )'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Population',
                        colorByPoint: true,
                        data: [{
                            name: 'Male',
                            y: popChartData[0]['male']
                        }, {
                            name: 'Female',
                            y: popChartData[0]['female']
                        }]
                    }]
                });
            //});
        //});
    });


