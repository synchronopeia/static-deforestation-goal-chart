import { readFileSync }  from 'fs';

import parse  from 'csv-parse/lib/sync.js';

const csvReadRecs = (filePath) => {
    const csvString = readFileSync(filePath, 'utf8');
    const rows = parse(csvString, {});
    const cols = rows.shift();
    const data = [];

    for (let colIndex = 1; colIndex < cols.length; colIndex += 1) {
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
            const key = `${cols[colIndex]}/${rows[rowIndex][0]}`;
            const value = rows[rowIndex][colIndex];
            data.push([key, value])
        }
    }
    return data;
};

export default csvReadRecs;
