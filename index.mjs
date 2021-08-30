import { readFileSync }  from 'fs';

import debugFn from 'debug';
import parse  from 'csv-parse/lib/sync.js';
import camelCase from 'lodash.camelcase';

import csvReadDefs from './lib/csv-read-defs.mjs';
import csvReadRecs from './lib/csv-read-recs.mjs';

const debug = debugFn('index');

const {
    RECS_FILE_PATH,
    FIELD_DEFS_FILE_PATH,
    JURISDICTION_DEFS_FILE_PATH,
} = process.env;


const recs = csvReadRecs(RECS_FILE_PATH);
const fieldDefs = csvReadDefs(FIELD_DEFS_FILE_PATH);
const jurisdictionDefs = csvReadDefs(JURISDICTION_DEFS_FILE_PATH);

debug(recs);
// debug(fieldDefs);
// debug(jurisdictionDefs);
