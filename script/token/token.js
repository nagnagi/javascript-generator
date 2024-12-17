class Token {
    /**
     * @param {Array<String>} tokenList
     */
    constructor(tokenList) {
        this.tokenList = tokenList;
    }

    /**
     * @returns {Token}
     */
    expand() {
    }

    /**
     * @returns {Array<String>}
     */
    getTokenList() {
        return this.tokenList;
    }
}
