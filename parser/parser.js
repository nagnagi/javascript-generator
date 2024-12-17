/**
 * @param {TokenLv2} token
 * @returns {{String: String, String: String}}
 */
const sliceAtEqual = (token) => {
    const tokenList = token.getTokenList();
    return {
        beforeEqual: tokenList.slice(0, tokenList.indexOf('=')),
        afterEqual: tokenList.slice(tokenList.indexOf('=') + 1, tokenList.length)
    };
}

/**
 * @param {Array<String>} beforeEqualToken
 * @returns {String}
 */
const definitionOfFunc = (beforeEqualToken) => {
    const funcIdentifier = beforeEqualToken[0];

    let funcDefinition = 'const ' + funcIdentifier + ' = ';
    beforeEqualToken.shift();
    for (const identifier of beforeEqualToken) {
        funcDefinition += identifier + ' => ';
    }

    return funcDefinition;
}

/**
 * @param {TokenLv2} token\
 * @returns {String}
 */
const generateScript = (token) => {
    const {beforeEqual, afterEqual} = sliceAtEqual(token);
    const def = definitionOfFunc(beforeEqual);
    const process = '{};';
    return def + process;
};
