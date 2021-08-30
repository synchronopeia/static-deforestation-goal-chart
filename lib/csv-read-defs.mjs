import { readFileSync }  from 'fs';

import parse  from 'csv-parse/lib/sync.js';
import camelCase from 'lodash.camelcase';

const csvReadDefs = (filePath) => {
    const csvString = readFileSync(filePath, 'utf8');
    const rows = parse(csvString, {});
    const cols = rows.shift().map(colName => camelCase(colName));
    const defs = [];

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
        const def = {};
        for (let colIndex = 0; colIndex < cols.length; colIndex += 1) {
            def[cols[colIndex]] = rows[rowIndex][colIndex];
        }
        defs.push(def);
    }

    return defs;
}

export default csvReadDefs;
