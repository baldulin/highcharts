/* *
 *
 *  (c) 2020-2021 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

/* *
 *
 *  Declarations
 *
 * */

/**
 * Contains all possible types of the class registry.
 */
export type StoreType = StoreTypeRegistry[keyof StoreTypeRegistry];

/**
 * Describes the class registry as a record object with class name and their
 * class types (aka class constructor).
 */
export interface StoreTypeRegistry {
    // nothing here yet
}

/* *
 *
 *  Export
 *
 * */

export default StoreType;
