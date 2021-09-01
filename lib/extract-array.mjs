const extractArray = (recs, variableName) => {
    const arrayVariable = [];
    recs.forEach((rec) => {
        const variableFullName = rec[0].split('/')[1];
        const indexOfOpenBracket = variableFullName.indexOf('[');
        const indexOfCloseBracket = variableFullName.indexOf(']');
        if (indexOfOpenBracket === -1) return;
        if (indexOfCloseBracket === -1) return;
        const variableBaseName = variableFullName.substring(0, indexOfOpenBracket);
        if (variableBaseName !== variableName) return;
        arrayVariable.push([variableFullName.substring(indexOfOpenBracket + 1, indexOfCloseBracket), rec[1]]);
    });
    return arrayVariable;
};

export default extractArray;
