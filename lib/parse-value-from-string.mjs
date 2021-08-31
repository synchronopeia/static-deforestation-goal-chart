const ASSERT_STRING_ARG = 'ASSERT_STRING_ARG: input argument must be a string';
const ASSERT_NO_SEPARATOR = 'ASSERT_NO_SEPARATOR: input must not contain ","';
const ASSERT_NO_DECIMAL = 'ASSERT_NO_DECIMAL: input must not contain "."';
const ASSERT_NUMBER = 'ASSERT_NUMBER: input is not a number';

const parseValueFromString = (stringValue) => {
    if (typeof stringValue !== 'string') throw Error(ASSERT_STRING_ARG);
    if (stringValue.includes(',')) throw Error(`${ASSERT_NO_SEPARATOR} "${stringValue}"`);
    if (stringValue.includes('.')) throw Error(`${ASSERT_NO_DECIMAL} "${stringValue}"`);

    if (!stringValue.length) return null;

    const value = Number(stringValue);

    if (Number.isNaN(value)) throw Error(`${ASSERT_NUMBER} "${stringValue}"`);

    return value;
};

export default parseValueFromString;
