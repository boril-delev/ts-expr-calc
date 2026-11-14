import type { InputPosRange } from "#input/input.js";

export class Err {
    #msg: string;
    #range: InputPosRange;

    get msg() {
        return this.#msg;
    }
    get range() {
        return this.#range;
    }

    constructor(msg: string, range: InputPosRange) {
        this.#msg = msg;
        this.#range = range;
    }
}
