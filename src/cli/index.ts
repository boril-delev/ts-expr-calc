import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { TokenIter } from "#scan/token-iter.js";
import { Input } from "#input/input.js";
import util from "node:util";

// totally not vibe-coded debug function
function debug(obj: any, seen = new WeakSet()): any {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (seen.has(obj)) {
        return "[Circular]";
    }
    seen.add(obj);
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map((item) => debug(item, seen));
    }
    // Preserve useful representations of built-in objects
    if (obj instanceof Date || obj instanceof RegExp) {
        return obj;
    }
    const result: any = {};
    // Include ordinary own properties
    for (const key of Object.keys(obj)) {
        try {
            result[key] = debug(obj[key], seen);
        } catch (e) {
            result[key] = `[Error: ${(e as Error).message}]`;
        }
    }
    // Walk the prototype chain and collect getters
    let proto = Object.getPrototypeOf(obj);
    while (proto && proto !== Object.prototype) {
        for (const key of Object.getOwnPropertyNames(proto)) {
            if (key === "constructor" || key in result) {
                continue;
            }
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (descriptor?.get) {
                try {
                    result[key] = debug(obj[key], seen);
                } catch (e) {
                    result[key] = `[Error: ${(e as Error).message}]`;
                }
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}

async function main() {
    const rl = readline.createInterface({
        input: stdin,
        output: stdout,
    });
    console.log('Enter an expression or "quit" to quit.');
    while (true) {
        const expr = await rl.question("> ");
        if (expr === "quit") {
            break;
        }
        const tokenIter = new TokenIter(new Input(expr));
        while (!tokenIter.isEof) {
            console.log(
                util.inspect(debug(tokenIter.cur), { depth: null, colors: true, compact: false }),
            ); //(tokenIter.cur.val, {depth: null, colors: true, compact: false}));
            tokenIter.next();
        }
    }
    rl.close();
}

main();
