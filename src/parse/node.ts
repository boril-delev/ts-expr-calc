import * as scan from "#scan/token.js";

export interface NodeVal {
    eval(): number;
}

export class Num implements NodeVal {
    #val: number;

    get val() {
        return this.#val;
    }

    constructor(val: number) {
        this.#val = val;
    }

    eval(): number {
        return this.#val;
    }
}

export class UnaryOper implements NodeVal {
    #func: (l: number) => number;
    #lhs: Node;

    get func() {
        return this.#func;
    }
    get lhs() {
        return this.#lhs;
    }

    constructor(func: (l: number) => number, lhs: Node) {
        this.#func = func;
        this.#lhs = lhs;
    }

    eval(): number {
        return this.#func(this.#lhs.eval());
    }
}
export class BinaryOper implements NodeVal {
    #func: (l: number, r: number) => number;
    #lhs: Node;
    #rhs: Node;

    get func() {
        return this.#func;
    }
    get lhs() {
        return this.#lhs;
    }
    get rhs() {
        return this.#rhs;
    }

    constructor(func: (l: number, r: number) => number, lhs: Node, rhs: Node) {
        this.#func = func;
        this.#lhs = lhs;
        this.#rhs = rhs;
    }

    eval(): number {
        return this.#func(this.#lhs.eval(), this.#rhs.eval());
    }
}

export class Node {
    #val: NodeVal;

    get val() {
        return this.#val;
    }

    constructor(val: NodeVal) {
        this.#val = val;
    }

    eval(): number {
        return this.#val.eval();
    }
}
