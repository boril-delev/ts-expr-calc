export type InputPos = number;
export class InputPosRange {
    #beg: InputPos;
    #end: InputPos;

    get beg() {
        return this.#beg;
    }
    set beg(beg: InputPos) {
        this.#beg = beg;
    }
    get end() {
        return this.#end;
    }
    get len() {
        return this.#end - this.#beg;
    }
    set end(end: InputPos) {
        this.#end = end;
    }

    constructor(beg: InputPos, end: InputPos) {
        this.#beg = beg;
        this.#end = end;
    }

    contains(pos: InputPos): boolean {
        return this.#beg <= pos && pos < this.#end;
    }
}

export class Input {
    #arr: Array<string>;

    constructor(input: string) {
        this.#arr = Array.from(input);
    }

    get len(): number {
        return this.#arr.length;
    }
    at(idx: number): string {
        return this.#arr[idx] ?? "\0";
    }
}
export class InputSlice {
    #input: Input;
    #pos: InputPos;
    #validPosRange: InputPosRange;

    get input() {
        return this.#input;
    }
    get pos() {
        return this.#pos;
    }
    get validPosRange() {
        return this.#validPosRange;
    }

    constructor(
        input: Input,
        pos: number = 0,
        validPosRange: InputPosRange = new InputPosRange(0, input.len),
    ) {
        this.#input = input;
        this.#pos = pos;
        this.#validPosRange = validPosRange;
    }

    at(relativeIdx: number): string {
        const idx = this.#pos + relativeIdx;
        return this.#validPosRange.contains(idx) ? this.#input.at(idx) : "\0";
    }
    next(offset: number = 1): void {
        this.#pos += offset;
    }
}
