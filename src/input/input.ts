export class Input {
    #arr: Array<string>;

    get len(): number {
        return this.#arr.length;
    }
    at(idx: number): string {
        return this.#arr[idx] ?? "\0";
    }

    constructor(input: string) {
        this.#arr = Array.from(input);
    }
}
export class InputSlice {
    #input: Input;
    #pos: number;
    #begPos: number;
    #endPos: number;

    get pos() {
        return this.#pos;
    }
    get begPos() {
        return this.#begPos;
    }
    get endPos() {
        return this.#endPos;
    }

    at(relativeIdx: number): string {
        const idx = this.#pos + relativeIdx;
        return this.#begPos < idx && idx < this.#endPos ? this.#input.at(idx) : "\0";
    }
    next(offset: number = 1): void {
        this.#pos += offset;
    }

    constructor(input: Input, pos: number = 0, begPos: number = 0, endPos: number = input.len) {
        this.#input = input;
        this.#pos = pos;
        this.#begPos = begPos;
        this.#endPos = endPos;
    }
}