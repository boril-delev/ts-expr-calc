export class UnaryOper {
    #func: (l: number) => number;

    get func() {
        return this.#func;
    }

    constructor(func: (l: number) => number) {
        this.#func = func;
    }
}
export class BinaryOper {
    #func: (l: number, r: number) => number;

    get func() {
        return this.#func;
    }

    constructor(func: (l: number, r: number) => number) {
        this.#func = func;
    }
}
export class Oper<SpecificOper> {
    #oper: SpecificOper;

    get oper() {
        return this.#oper;
    }

    constructor(oper: SpecificOper) {
        this.#oper = oper;
    }
}

export type UnaryOperKind = "pref" | "post";
export type OperAssoc = "left" | "right";
export class UnaryOperLayer {
    #kind: UnaryOperKind;
    #opers: Map<string, Oper<UnaryOper>>;

    get kind() {
        return this.#kind;
    }
    get opers() {
        return this.#opers;
    }

    constructor(kind: UnaryOperKind, opers: Map<string, Oper<UnaryOper>>) {
        this.#kind = kind;
        this.#opers = opers;
    }
}
export class BinaryOperLayer {
    #assoc: OperAssoc;
    #opers: Map<string, Oper<BinaryOper>>;

    get assoc() {
        return this.#assoc;
    }
    get opers() {
        return this.#opers;
    }

    constructor(assoc: OperAssoc, opers: Map<string, Oper<BinaryOper>>) {
        this.#assoc = assoc;
        this.#opers = opers;
    }
}

// in order of priority (first = lowest priority)
export const operLayers: Array<UnaryOperLayer | BinaryOperLayer> = [
    new BinaryOperLayer("left", new Map([
        ["+", new Oper(new BinaryOper((l, r) => l + r))],
        ["-", new Oper(new BinaryOper((l, r) => l - r))],
    ])),
    new BinaryOperLayer("left", new Map([
        ["*", new Oper(new BinaryOper((l, r) => l * r))],
        ["/", new Oper(new BinaryOper((l, r) => l / r))],
    ])),
    new UnaryOperLayer("pref", new Map([
        ["+", new Oper(new UnaryOper((l) => +l))],
        ["-", new Oper(new UnaryOper((l) => -l))],
    ])),
];
