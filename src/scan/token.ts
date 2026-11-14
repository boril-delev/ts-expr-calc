export class OpenParen {}
export class CloseParen {}
export class Num {
    #num: number;

    get num() {
        return this.#num;
    }

    constructor(num: number) {
        this.#num = num;
    }
}
export class Oper {
    #str: string;
    #precedence: number;
    #leftAssoc: boolean;
    #rightAssoc: boolean;

    get str() {
        return this.#str;
    }
    get precedence() {
        return this.#precedence;
    }
    get leftAssoc() {
        return this.#leftAssoc;
    }
    get rightAssoc() {
        return this.#rightAssoc;
    }

    constructor(str: string, precedence: number, leftAssoc: boolean, rightAssoc: boolean) {
        this.#str = str;
        this.#precedence = precedence;
        this.#leftAssoc = leftAssoc;
        this.#rightAssoc = rightAssoc;
    }
}

export type TokenVal = Num | Oper | OpenParen | CloseParen;
export class Token {
    #val: TokenVal;
    #begIdx: number;
    #endIdx: number;

    get val() {
        return this.#val;
    }
    get begIdx() {
        return this.#begIdx;
    }
    get endIdx() {
        return this.#endIdx;
    }

    constructor(val: TokenVal, begIdx: number, endIdx: number) {
        this.#val = val;
        this.#begIdx = begIdx;
        this.#endIdx = endIdx;
    }
}
