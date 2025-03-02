Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json', function (data) {

    // Initialize the chart
    Highcharts.mapChart('container', {

        title: {
            text: 'Subtitle options demo'
        },

        subtitle: {
            align: 'left',
            floating: true,
            style: {
                color: '#303030'
            },
            text: 'This is a subtitle text<br>with <span style="font-style:italic">formatted</span><br>' +
                'and <span style="color: green; font-weight:bold">colored</span> text',
            verticalAlign: 'middle',
            x: 0,
            y: 50
        },

        colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic'
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['custom/world'],
            joinBy: ['iso-a2', 'code'],
            name: 'Population density',
            states: {
                hover: {
                    color: '#a4edba'
                }
            },
            tooltip: {
                valueSuffix: '/km²'
            }
        }]
    });
});