export class Input {
    #arr: Array<string>;
    #idx: number;

    get idx() {
        return this.#idx;
    }

    at(relativeIdx: number): string {
        return this.#arr[relativeIdx - this.#idx] ?? "\0";
    }
    next(offset: number = 1): void {
        this.#idx += offset;
    }

    constructor(input: string) {
        this.#arr = Array.from(input);
        this.#idx = 0;
    }
}
