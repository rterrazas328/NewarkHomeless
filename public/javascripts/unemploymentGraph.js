$.ajax({
    type: "GET",
    url: '/unemploymentGraph',
    dataType: 'json'

}).done(function(resultObj) {

    var data = [];

    for (var i=0; i<resultObj['results'].length; i++){
        var temp = [];
        var date = resultObj['results'][i]['date'];
        temp[0] = Date.parse(date);
        temp[1] = resultObj['results'][i]['unemployment_rate'];
        data[i] = temp;
    }

    $(function () {
        $('#unemploymenyGraph').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Newark Unemployment Rates'
            },
            subtitle: {
                text: 'Data From 2005 - 2015'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Unemployment Rate'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
                type: 'area',
                name: 'Unemployment Rate',
                data: data
            }]
        });
    });
});