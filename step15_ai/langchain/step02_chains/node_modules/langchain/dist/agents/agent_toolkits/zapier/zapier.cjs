"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZapierToolKit = void 0;
const base_js_1 = require("../base.cjs");
const zapier_js_1 = require("../../../tools/zapier.cjs");
class ZapierToolKit extends base_js_1.Toolkit {
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
            const tool = new zapier_js_1.ZapierNLARunAction(zapierNLAWrapper, action.id, action.description, action.params);
            toolkit.tools.push(tool);
        }
        return toolkit;
    }
}
exports.ZapierToolKit = ZapierToolKit;
