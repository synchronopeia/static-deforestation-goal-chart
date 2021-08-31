import { readFileSync }  from 'fs';

import parse  from 'csv-parse/lib/sync.js';

import parseValueFromString from './parse-value-from-string.mjs';

const csvReadRecs = (filePath) => {
    const csvString = readFileSync(filePath, 'utf8');
    const rows = parse(csvString, {});
    const cols = rows.shift();
    const data = [];

    for (let colIndex = 1; colIndex < cols.length; colIndex += 1) {
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
            const key = `${cols[colIndex]}/${rows[rowIndex][0]}`;
            try {
                data.push([key, parseValueFromString(rows[rowIndex][colIndex])]);
            } catch (parseError) {
                throw Error(`${parseError.message} row ${rowIndex + 2} col ${colIndex + 1}`);
            }
        }
    }
    return data;
};

export default csvReadRecs;
