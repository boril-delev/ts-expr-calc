import type { Err } from "#error/err.js";
import type { InputPosRange } from "#input/input.js";

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

    get str() {
        return this.#str;
    }

    constructor(str: string) {
        this.#str = str;
    }
}

export class TokenVal {
    #val: Num | Oper | OpenParen | CloseParen;
    #err: Err | null;

    get val() {
        return this.#val;
    }
    get err() {
        return this.#err;
    }

    constructor(val: Num | Oper | OpenParen | CloseParen, err: Err | null) {
        this.#val = val;
        this.#err = err;
    }
}
export class Token {
    #val: TokenVal;
    #posRange: InputPosRange;

    get val() {
        return this.#val;
    }
    get posRange() {
        return this.#posRange;
    }

    constructor(val: TokenVal, posRange: InputPosRange) {
        this.#val = val;
        this.#posRange = posRange;
    }
}
