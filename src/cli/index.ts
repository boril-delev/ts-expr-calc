import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

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
        let arr = Array.from(expr);
        console.log(`You entered: "${arr}"`);
        // TODO: handle expression calculation
    }
    rl.close();
}

main();
