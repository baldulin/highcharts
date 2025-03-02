/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type ColorMapMixin from '../ColorMapMixin';
import type HeatmapPointOptions from './HeatmapPointOptions';
import type HeatmapSeries from './HeatmapSeries';
import type SVGPath from '../../Core/Renderer/SVG/SVGPath';

import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const {
    seriesTypes: {
        scatter: {
            prototype: {
                pointClass: ScatterPoint
            }
        }
    }
} = SeriesRegistry;
import U from '../../Core/Utilities.js';
const {
    clamp,
    defined,
    extend,
    pick
} = U;

/* *
 *
 *  Class
 *
 * */

class HeatmapPoint extends ScatterPoint {

    /* *
     *
     *  Properties
     *
     * */

    public options: HeatmapPointOptions = void 0 as any;

    public pointPadding?: number;

    public series: HeatmapSeries = void 0 as any;

    public value: (number|null) = void 0 as any;

    public x: number = void 0 as any;

    public y: number = void 0 as any;

    /* *
     *
     *  Functions
     *
     * */

    /* eslint-disable valid-jsdoc */

    /**
     * @private
     */
    public applyOptions(
        options: HeatmapPointOptions,
        x?: number
    ): HeatmapPoint {
        const point: HeatmapPoint = super.applyOptions.call(
            this,
            options,
            x
        ) as any;

        point.formatPrefix = point.isNull || point.value === null ?
            'null' : 'point';

        return point;
    }

    public getCellAttributes(): HeatmapPoint.CellAttributes {
        const point = this,
            series = point.series,
            seriesOptions = series.options,
            xPad = (seriesOptions.colsize || 1) / 2,
            yPad = (seriesOptions.rowsize || 1) / 2,
            xAxis = series.xAxis,
            yAxis = series.yAxis,
            markerOptions = point.options.marker || series.options.marker,
            pointPlacement = series.pointPlacementToXValue(), // #7860
            pointPadding = pick(
                point.pointPadding, seriesOptions.pointPadding, 0
            ),
            cellAttr: HeatmapPoint.CellAttributes = {
                x1: clamp(Math.round(xAxis.len -
                    (xAxis.translate(
                        point.x - xPad,
                        false,
                        true,
                        false,
                        true,
                        -pointPlacement
                    ) || 0)
                ), -xAxis.len, 2 * xAxis.len),

                x2: clamp(Math.round(xAxis.len -
                    (xAxis.translate(
                        point.x + xPad,
                        false,
                        true,
                        false,
                        true,
                        -pointPlacement
                    ) || 0)
                ), -xAxis.len, 2 * xAxis.len),

                y1: clamp(Math.round(
                    (yAxis.translate(
                        point.y - yPad,
                        false,
                        true,
                        false,
                        true
                    ) || 0)
                ), -yAxis.len, 2 * yAxis.len),

                y2: clamp(Math.round(
                    (yAxis.translate(
                        point.y + yPad,
                        false,
                        true,
                        false,
                        true
                    ) || 0)
                ), -yAxis.len, 2 * yAxis.len)
            };

        const dimensions: [['width', 'x'], ['height', 'y']] =
            [['width', 'x'], ['height', 'y']];

        // Handle marker's fixed width, and height values including border
        // and pointPadding while calculating cell attributes.
        dimensions.forEach(function (dimension): void {
            const prop = dimension[0],
                direction = dimension[1];

            let start = direction + '1',
                end = direction + '2';

            const side = Math.abs(
                    cellAttr[start] - cellAttr[end]
                ),
                borderWidth = markerOptions &&
                    markerOptions.lineWidth || 0,
                plotPos = Math.abs(
                    cellAttr[start] + cellAttr[end]
                ) / 2,
                widthOrHeight = markerOptions && markerOptions[prop];

            if (defined(widthOrHeight) && widthOrHeight < side) {
                const halfCellSize = widthOrHeight / 2 + borderWidth / 2;

                cellAttr[start] = plotPos - halfCellSize;

                cellAttr[end] = plotPos + halfCellSize;
            }

            // Handle pointPadding
            if (pointPadding) {
                if (direction === 'y') {
                    start = end;
                    end = direction + '1';
                }
                cellAttr[start] += pointPadding;
                cellAttr[end] -= pointPadding;
            }
        });

        return cellAttr;
    }

    /**
     * @private
     */
    public haloPath(size: number): SVGPath {
        if (!size) {
            return [];
        }
        const rect = this.shapeArgs;

        return [
            'M',
            (rect as any).x - size,
            (rect as any).y - size,
            'L',
            (rect as any).x - size,
            (rect as any).y + (rect as any).height + size,
            (rect as any).x + (rect as any).width + size,
            (rect as any).y + (rect as any).height + size,
            (rect as any).x + (rect as any).width + size,
            (rect as any).y - size,
            'Z'
        ];
    }

    /**
     * Color points have a value option that determines whether or not it is
     * a null point
     * @private
     */
    public isValid(): boolean {
        // undefined is allowed
        return (
            this.value !== Infinity &&
            this.value !== -Infinity
        );
    }

    /* eslint-enable valid-jsdoc */

}

/* *
 *
 *  Class Prototype
 *
 * */

interface HeatmapPoint {
    dataLabelOnNull: ColorMapMixin.ColorMapPoint['dataLabelOnNull'];
    moveToTopOnHover: ColorMapMixin.ColorMapPoint['moveToTopOnHover'];
}
extend(HeatmapPoint.prototype, {
    dataLabelOnNull: true,
    moveToTopOnHover: true,
    ttBelow: false
});

/* *
 *
 *  Class Namespace
 *
 * */

namespace HeatmapPoint {
    export interface CellAttributes extends Record<string, number> {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    }
}
/* *
 *
 *  Default Export
 *
 * */

export default HeatmapPoint;
