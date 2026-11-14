export type OperAssoc = "left" | "right" | "none";
export type OperType = "prefUnary" | "postUnary" | "binary";
export class Oper {
    #str: string;

    get str() {
        return this.#str;
    }

    constructor(str: string) {
        this.#str = str;
    }
}
export class OperPriorityLayer {
    #type: OperType;
    #assoc: OperAssoc;
    #opers: Array<Oper>;

    get type() {
        return this.#type;
    }
    get assoc() {
        return this.#assoc;
    }
    get opers() {
        return this.#opers;
    }

    constructor(type: OperType, assoc: OperAssoc, opers: Array<Oper>) {
        this.#type = type;
        this.#assoc = assoc;
        this.#opers = opers;
    }
}

// in order of priority (first = lowest priority)
export const operLayers = [
    new OperPriorityLayer("binary", "left", [new Oper("+"), new Oper("-")]),
    new OperPriorityLayer("binary", "left", [new Oper("*"), new Oper("/")]),
    new OperPriorityLayer("prefUnary", "right", [new Oper("+"), new Oper("-")]),
    new OperPriorityLayer("postUnary", "left", []),
];
