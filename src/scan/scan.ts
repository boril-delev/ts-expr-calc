import { InputPosRange, InputSlice } from "#input/input.js";
import {
    Whitespace,
    OpenParen,
    CloseParen,
    Num,
    Oper,
    UnrecognizedChar,
    TokenVal,
} from "#scan/token.js";
import { Err } from "#error/err.js";

export const maxScanStrLen = 4;

export interface Scan {
    skipHandled(input: InputSlice): void;
    scan(input: InputSlice): TokenVal;
}

export class WhitespaceScan implements Scan {
    skipHandled(input: InputSlice): void {
        while (input.at(0) == " ") {
            input.next();
        }
    }
    scan(input: InputSlice): TokenVal {
        this.skipHandled(input);
        return new TokenVal(new Whitespace(), null);
    }
}
export class OpenParenScan implements Scan {
    skipHandled(input: InputSlice): void {
        if (input.at(0) === "(") {
            input.next();
        }
    }
    scan(input: InputSlice): TokenVal {
        input.next();
        return new TokenVal(new OpenParen(), null);
    }
}
export class CloseParenScan implements Scan {
    skipHandled(input: InputSlice): void {
        if (input.at(0) === ")") {
            input.next();
        }
    }
    scan(input: InputSlice): TokenVal {
        input.next();
        return new TokenVal(new CloseParen(), null);
    }
}
export class NumScan implements Scan {
    #isDigit(x: string): boolean {
        return "0" <= x && x <= "9";
    }
    #isLetter(x: string): boolean {
        return ("a" <= x && x <= "z") || ("A" <= x && x <= "Z") || x == "_";
    }
    #isHandled(x: string): boolean {
        return this.#isDigit(x) || this.#isLetter(x);
    }

    #skipTrail(input: InputSlice): InputPosRange {
        const begPos = input.pos;
        while (this.#isHandled(input.at(0))) {
            input.next();
        }
        const endPos = input.pos;
        return new InputPosRange(begPos, endPos);
    }
    #scanWhole(input: InputSlice): number | Err {
        if (!this.#isDigit(input.at(0))) {
            return new Err("Expected a number.", this.#skipTrail(input));
        }
        let num = 0;
        for (; this.#isDigit(input.at(0)); input.next()) {
            num *= 10;
            num += parseInt(input.at(0));
        }
        // TODO: handle overflow
        return num;
    }
    #scanFract(input: InputSlice): number | Err {
        if (!this.#isDigit(input.at(0))) {
            return new Err("Expected a faction.", this.#skipTrail(input));
        }
        let num = 0;
        let mul = 1;
        for (; this.#isDigit(input.at(0)); input.next()) {
            mul /= 10;
            num += mul * parseInt(input.at(0));
        }
        // TODO: handle too precise fractions
        return num;
    }

    skipHandled(input: InputSlice): void {
        if (this.#isDigit(input.at(0))) {
            input.next();
            this.#skipTrail(input);
        }
    }
    scan(input: InputSlice): TokenVal {
        const whole = this.#scanWhole(input);
        if (whole instanceof Err) {
            return new TokenVal(new Num(0), whole);
        }
        const fract =
            input.at(0) != "."
                ? 0
                : (() => {
                      input.next();
                      return this.#scanFract(input);
                  })();
        if (fract instanceof Err) {
            return new TokenVal(new Num(0), fract);
        }
        const trailRange = this.#skipTrail(input);
        if (trailRange.len != 0) {
            return new TokenVal(
                new Num(0),
                new Err("Unexpected trailing characters after number.", trailRange),
            );
        }
        return new TokenVal(new Num(whole + fract), null);
    }
}
export class OperScan implements Scan {
    #maxOperLen: number = 0;
    #opers: Map<string, Oper>;

    constructor(opers: Array<Oper>) {
        this.#maxOperLen = Math.max(...opers.map((oper) => oper.str.length));
        this.#opers = new Map(opers.map((oper) => [oper.str, oper]));
    }

    #scanStr(input: InputSlice): string {
        let curStr: string = "";
        let longestStr: string = "";
        for (let i = 0; i < this.#maxOperLen; i++) {
            curStr += input.at(i);
            if (this.#opers.has(curStr)) {
                longestStr = curStr;
            }
        }
        return longestStr;
    }

    skipHandled(input: InputSlice): void {
        input.next(this.#scanStr(input).length);
    }
    scan(input: InputSlice): TokenVal {
        const scanStr = this.#scanStr(input);
        input.next(scanStr.length);
        const res = this.#opers.get(scanStr);
        return new TokenVal(res as Oper, null);
    }
}

export class UnrecognizedCharScan implements Scan {
    skipHandled(input: InputSlice): void {
        input.next();
    }
    scan(input: InputSlice): TokenVal {
        const res = new TokenVal(
            new UnrecognizedChar(),
            new Err("Unrecognized character.", new InputPosRange(input.pos, input.pos + 1)),
        );
        input.next();
        return res;
    }
}
