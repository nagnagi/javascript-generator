class TokenLv1 extends Token {
    /**
     * @param {Array<String>} tokenList
     */
    constructor(tokenList) {
        super(tokenList);
    }

    /**
     * @param {String} string
     * @returns {TokenLv1}
     */
    static expandFromString(string) {
        return new TokenLv1(string.split(' '));
    }

    /**
     * @returns {TokenLv2}
     */
    expand() {
        let newTokenList = new Array();
        for (const token of this.tokenList) {
            let charList = token.split('');
            let stringStack = '';
            for (const char of charList) {
                switch (char) {
                case '(':
                case ')':
                case '=':
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                case '?':
                    if (stringStack.length != 0) {
                        newTokenList.push(stringStack);
                        stringStack = '';
                    }
                    newTokenList.push(char);
                    break;
                default:
                    stringStack += char;
                    break;
                }
            }
            if (stringStack.length != 0) {
                newTokenList.push(stringStack);
            }
        }
        return new TokenLv2(newTokenList);
    }
}