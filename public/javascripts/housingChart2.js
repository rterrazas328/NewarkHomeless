$(function () {

    var colors = Highcharts.getOptions().colors,
        categories = [ 'All households', 'Vacant housing units'],
        data = [{
            y: 92479,
            color: colors[0],
            drilldown: {
                name: 'All households',
                categories: ['Family households<br>Married couple family', 'Family households<br>M householder,no wife', 'Family households<br>F householder,no husband', 'Nonfamily households<br>Householder living alone', 'Nonfamily households<br>Householder not living alone'],
                data: [ 25204, 6706, 27310, 27829, 5430],
                color: colors[0]
            }
        }, {
            y: 16537,
            color: colors[1],
            drilldown: {
                name: 'Vacant housing units',
                categories: ['Vacant housing units'],
                data: [16537],
                color: colors[1]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: data[i].color
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: new Highcharts.Color(data[i].color).brighten(brightness).get()
            });
        }
    }

    // Create the chart
    $('#housingChart2').highcharts({
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Newark Vacant Housing & Occupied Households ( Total 109016 )'
        },
        yAxis: {
            title: {
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        series: [{
            name: 'Total',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }, {
            name: 'Housing Units',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function () {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y : null;
                }
            }
        }]
    });
});