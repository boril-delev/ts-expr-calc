export class Err {
    #msg: string;
    #begPos: number;
    #endPos: number;

    get msg() {
        return this.#msg;
    }
    get begPos() {
        return this.#begPos;
    }
    get endPos() {
        return this.#endPos;
    }

    constructor(msg: string, begPos: number, endPos: number) {
        this.#msg = msg;
        this.#begPos = begPos;
        this.#endPos = endPos;
    }
}
