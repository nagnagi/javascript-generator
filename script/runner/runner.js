/**
 * @param {String} scripts
 */
function loadScript(scripts) {
    const scriptList = scripts.split('\n');
    console.log(scriptList);

    let runnableScripts = '';
    for (const script of scriptList) {
        console.log(TokenLv1.expandFromString(script));
        const tokenLv2 = TokenLv1.expandFromString(script).expand();
        console.log(tokenLv2);
        const runnableCode = generateScript(tokenLv2);
        runnableScripts += runnableCode + '\n';
    }
    return runnableScripts;
}
