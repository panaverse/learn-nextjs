import { Toolkit } from "../base.js";
import { Tool } from "../../../tools/base.js";
import { ZapierNLAWrapper } from "../../../tools/zapier.js";
export declare class ZapierToolKit extends Toolkit {
    tools: Tool[];
    static fromZapierNLAWrapper(zapierNLAWrapper: ZapierNLAWrapper): Promise<ZapierToolKit>;
}
