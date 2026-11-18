import * as constants from "#constants.js"
import type { TokenIter } from "#scan/token-iter.js";
import type { Node, UnaryOper, BinaryOper } from "./node.js";
import * as token from "#scan/token.js"

export interface Parse {
    parse(tokenIter: TokenIter): Node;
}
export class ParseOper implements Parse {
    #operLayers: Array<constants.UnaryOperLayer | constants.BinaryOperLayer>;

    constructor(operLayers: Array<constants.UnaryOperLayer | constants.BinaryOperLayer>) {
        this.#operLayers = operLayers;
    }

    #parseLayer(tokenIter: TokenIter, nextParse: Parse, layerIdx: number): Node {
        if (layerIdx == this.#operLayers.length) {
            return nextParse.parse(tokenIter);
        }
        let nodes = new Array<Node>();
        nodes.push(this.#parseLayer(tokenIter, nextParse, layerIdx + 1));
        while (!tokenIter.isEof && tokenIter.cur.val.val instanceof token.Oper) {
            const operStr = tokenIter.cur.val.val.str;
            const oper = this.#operLayers[layerIdx]?.opers.get(operStr);
            if (oper === undefined) {
                break;
            }
            tokenIter.next();

        }
        layerIdx++;
        if (layerIdx == this.#operLayers.length) {
            return nextParse(tokenIter);
        }
    }

    parse(tokenIter: TokenIter, nextParse: Parse): Node {
        if (tokenIter.isEof) {
            // TODO: ?
        }
    }
}
