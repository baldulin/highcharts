QUnit.test(
    'Setting lineWidth of mapline series should work in all browsers (#5201)',
    function (assert) {
        var chart = Highcharts.mapChart('container', {
            series: [
                {
                    type: 'mapline',
                    data: Highcharts.geojson(
                        Highcharts.maps['countries/us/custom/us-small'],
                        'mapline'
                    ),
                    lineWidth: 30
                }
            ]
        });

        assert.close(
            chart.series[0].group.element.getAttribute(
                'stroke-width'
            ) * chart.series[0].svgTransform.scaleX,
            30,
            0.0000000001,
            'Line width should be set'
        );
    }
);
