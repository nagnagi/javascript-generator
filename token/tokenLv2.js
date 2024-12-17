class TokenLv2 extends Token {
    /**
     * @param {Array<String>} tokenList
     */
    constructor(tokenList) {
        super(tokenList);
    }

    /**
     * @returns {Array<String>}
     */
    expand() {
        const newTokenList = new Array();
        for (const token of this.tokenList) {
            for (const char of token.split('')) {
                newTokenList.push(char);
            }
        }
        return newTokenList;
    }
}
