$.ajax({
    type: "GET",
    url: '/povertyAgeGraph',
    dataType: 'json'

}).done(function(resultObj) {

    $(function () {
        // Age categories
        var categories = ['0-4', '5', '6-11', '12-14',
            '15', '16-17', '18-24', '25-34', '35-44',
            '45-54', '55-64', '65-74', '75 +'];//*/
        //Male
        var male2013 = [];
        //Female
        var female2013 = [];
        var m = 0;
        var f = 0;
        for (var i=0; i<resultObj['results'].length; i++){
            var row = resultObj['results'][i];
            if(row['year'] == 2013){//only continue if year is 2013
                var field = row['field'];

                if(field.match(/Income in the past 12 months below poverty level - Male -/) != null){
                    male2013[m] = -1*row['value'];
                    m++;
                }
                else if( field.match(/Income in the past 12 months below poverty level - Female -/) != null){
                    female2013[f] = row['value'];
                    f++;
                }
            }
        }
        //console.log(male2013);
        //console.log(female2013);
        $(document).ready(function () {
            $('#povertyAgeGraph').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Income in the past 12 months below poverty level, 2013'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value);
                        }
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Dollar Amount: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },

                series: [{
                    name: 'Male',
                    data: male2013
                }, {
                    name: 'Female',
                    data: female2013
                }]
            });
        });

    });
});