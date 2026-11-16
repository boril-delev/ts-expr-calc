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
    #str: string;
    #oper: SpecificOper;

    get str() {
        return this.#str;
    }
    get oper() {
        return this.#oper;
    }

    constructor(str: string, oper: SpecificOper) {
        this.#str = str;
        this.#oper = oper;
    }
}

export type UnaryOperKind = "pref" | "post";
export type OperAssoc = "left" | "right";
export class UnaryOperLayer {
    #kind: UnaryOperKind;
    #opers: Array<Oper<UnaryOper>>;

    get kind() {
        return this.#kind;
    }
    get opers() {
        return this.#opers;
    }

    constructor(kind: UnaryOperKind, opers: Array<Oper<UnaryOper>>) {
        this.#kind = kind;
        this.#opers = opers;
    }
}
export class BinaryOperLayer {
    #assoc: OperAssoc;
    #opers: Array<Oper<BinaryOper>>;

    get assoc() {
        return this.#assoc;
    }
    get opers() {
        return this.#opers;
    }

    constructor(assoc: OperAssoc, opers: Array<Oper<BinaryOper>>) {
        this.#assoc = assoc;
        this.#opers = opers;
    }
}

// in order of priority (first = lowest priority)
export const operLayers: Array<UnaryOperLayer | BinaryOperLayer> = [
    new BinaryOperLayer("left", [
        new Oper("+", new BinaryOper((l, r) => l + r)),
        new Oper("-", new BinaryOper((l, r) => l - r)),
    ]),
    new BinaryOperLayer("left", [
        new Oper("*", new BinaryOper((l, r) => l * r)),
        new Oper("/", new BinaryOper((l, r) => l / r)),
    ]),
    new UnaryOperLayer("pref", [
        new Oper("+", new UnaryOper((l) => +l)),
        new Oper("-", new UnaryOper((l) => -l)),
    ]),
];
