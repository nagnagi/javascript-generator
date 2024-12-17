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

    let funcDefinition = 'var ' + funcIdentifier + ' = ';
    beforeEqualToken.shift();
    if (beforeEqualToken.length == 0) {
        funcDefinition += '() => ';
    }
    for (const identifier of beforeEqualToken) {
        funcDefinition += identifier + ' => ';
    }

    return funcDefinition;
}

/**
 * @param {Array<String>} afterEqualToken
 */
const replaceLambda = (afterEqualToken) => {
    const lambdaList = new Array();
    let rbracketIndexList = new Array();
    for (let i = 0; i < afterEqualToken.length; ++i) {
        const token = afterEqualToken[i];
        if (token == '(') {
            rbracketIndexList.push(i);
        }
        else if (token == ')') {
            const from = rbracketIndexList[rbracketIndexList.length - 1];
            const to = i;
            const lambdaName = '$lambda' + lambdaList.length;
            const before = afterEqualToken.slice(0, from);
            const after = afterEqualToken.slice(to + 1, afterEqualToken.length);
            const middle = afterEqualToken.slice(from + 1, to)
            lambdaList.push(
                {
                    name: lambdaName,
                    token: middle
                }
            );
            afterEqualToken = before.concat([lambdaName]).concat(after);
            rbracketIndexList.pop();
            i -= middle.length + 2;
        }
    }
    return {
        newAfterEqual: afterEqualToken,
        lambdaList: lambdaList
    };
}

/**
 * @param {Array<String>} afterEqual
 * @returns {String}
 */
const expandListProcessor = (afterEqual) => {
    let func = afterEqual[0];
    switch (func) {
    case '+':
        func = 'add';
        break;
    case '-':
        func = 'sub';
        break;
    case '*':
        func = 'mul';
        break;
    case '/':
        func = 'div';
        break;
    case '%':
        func = 'mod';
        break;
    case '?':
        func = 'ifxab'
        break;
    }
    afterEqual.shift();
    let process = func;
    for (let identifier of afterEqual) {
        process += ' ( ' + identifier + ' )';

    }
    return process;
}

/**
 * @param {Array<T>} lambdaList
 * @param {String} process
 */
const expandLambda = (lambdaList, process) => {
    let tokenList = TokenLv1.expandFromString(process).expand().getTokenList();
    console.log(tokenList)
    const lastLambda = lambdaList[lambdaList.length - 1];
    console.log(lastLambda);
    for (let i = 0; i < tokenList.length; ++i) {
        if (tokenList[i] == lastLambda.name) {
            const process = expandListProcessor(lastLambda.token);
            console.log(process);
            const before = tokenList.slice(0, i);
            const after  = tokenList.slice(i + 1 , tokenList.length);
            tokenList = before.concat(process).concat(after);
            console.log(tokenList);
            break;
        }
    }
    lambdaList.pop();
    let newProcess = '';
    for (let i = 0; i < tokenList.length - 1; ++i) {
        newProcess += tokenList[i] + ' ';
    }
    newProcess += tokenList[tokenList.length - 1];
    return {
        newProcess: newProcess,
        newLambdaList: lambdaList
    };
}

/**
 * @param {Array<String>} afterEqualToken
 * @returns {String}
 */
const processOfFunc = (afterEqualToken) => {
    let {newAfterEqual, lambdaList} = replaceLambda(afterEqualToken);
    console.log(lambdaList);
    console.log(newAfterEqual);
    let process = expandListProcessor(newAfterEqual);
    while (lambdaList.length) {
        const {newProcess, newLambdaList} = expandLambda(lambdaList, process);
        lambdaList = newLambdaList;
        process = newProcess;
    }
    return process;
}

/**
 * @param {TokenLv2} token
 * @returns {String}
 */
const generateScript = (token) => {
    const {beforeEqual, afterEqual} = sliceAtEqual(token);
    const def = definitionOfFunc(beforeEqual);
    const process = processOfFunc(afterEqual);
    return def + process + ';';
};
