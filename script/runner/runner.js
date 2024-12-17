/**
 * @param {String} scripts
 */
function loadScript(scripts) {
    const scriptList = scripts.split('\n');

    let runnableScripts = '';
    for (const script of scriptList) {
        const tokenLv2 = TokenLv1.expandFromString(script).expand();
        const runnableCode = generateScript(tokenLv2);
        runnableScripts += runnableCode + '\n';
    }
    return runnableScripts;
}
