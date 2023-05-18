import { Toolkit } from "../base.js";
import { ZapierNLARunAction } from "../../../tools/zapier.js";
export class ZapierToolKit extends Toolkit {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    static async fromZapierNLAWrapper(zapierNLAWrapper) {
        const toolkit = new ZapierToolKit();
        const actions = await zapierNLAWrapper.listActions();
        for (const action of actions) {
            const tool = new ZapierNLARunAction(zapierNLAWrapper, action.id, action.description, action.params);
            toolkit.tools.push(tool);
        }
        return toolkit;
    }
}
