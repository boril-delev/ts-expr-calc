import { InputPosRange, Input, InputSlice } from "#input/input.js";
import { Whitespace, Oper, Token, TokenVal, UnrecognizedChar } from "#scan/token.js";
import {
    maxScanStrLen,
    OpenParenScan,
    CloseParenScan,
    NumScan,
    OperScan,
    UnrecognizedCharScan,
    WhitespaceScan,
} from "#scan/scan.js";
import * as constants from "#constants.js";
import type { Scan } from "#scan/scan.js";

export class TokenIter {
    #scans: Array<Scan> = [
        new WhitespaceScan(),
        new OpenParenScan(),
        new CloseParenScan(),
        new NumScan(),
        new OperScan(
            constants.operLayers
                .map((layer) => layer.opers.map((oper) => new Oper(oper.str)))
                .flat(),
        ),
    ];
    #unrecognizedCharScan: UnrecognizedCharScan = new UnrecognizedCharScan();
    #input: InputSlice;
    #isEof: boolean = false;
    #cur: Token = new Token(new TokenVal(new UnrecognizedChar(), null), new InputPosRange(0, 0));

    get isEof() {
        return this.#isEof;
    }
    get cur() {
        return this.#cur;
    }

    constructor(input: Input) {
        this.#input = new InputSlice(input);
        this.next();
    }

    #pickScan(): Scan {
        let maxSkipped = 0;
        let maxSkippedScan = this.#unrecognizedCharScan;
        for (const scan of this.#scans) {
            const inputSlice = new InputSlice(
                this.#input.input,
                this.#input.pos,
                new InputPosRange(this.#input.pos, this.#input.pos + maxScanStrLen),
            );
            const begPos = inputSlice.pos;
            scan.skipHandled(inputSlice);
            const endPos = inputSlice.pos;
            if (maxSkipped < endPos - begPos) {
                maxSkipped = endPos - begPos;
                maxSkippedScan = scan;
            }
        }
        return maxSkippedScan;
    }

    #rawNext(): void {
        const scan = this.#pickScan();
        const begPos = this.#input.pos;
        const tokenVal = scan.scan(this.#input);
        const endPos = this.#input.pos;
        this.#cur = new Token(tokenVal, new InputPosRange(begPos, endPos));
    }
    next(): void {
        while (true) {
            this.#isEof = this.#input.pos >= this.#input.validPosRange.end;
            if (this.#isEof) {
                break;
            }
            this.#rawNext();
            if (!(this.#cur.val.val instanceof Whitespace)) {
                break;
            }
        }
    }
}
