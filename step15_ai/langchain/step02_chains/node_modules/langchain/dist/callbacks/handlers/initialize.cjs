"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTracingV2CallbackHandler = exports.getTracingCallbackHandler = void 0;
const tracer_langchain_js_1 = require("./tracer_langchain.cjs");
const tracer_langchain_v1_js_1 = require("./tracer_langchain_v1.cjs");
async function getTracingCallbackHandler(session) {
    const tracer = new tracer_langchain_v1_js_1.LangChainTracerV1();
    if (session) {
        await tracer.loadSession(session);
    }
    else {
        await tracer.loadDefaultSession();
    }
    return tracer;
}
exports.getTracingCallbackHandler = getTracingCallbackHandler;
async function getTracingV2CallbackHandler() {
    return new tracer_langchain_js_1.LangChainTracer();
}
exports.getTracingV2CallbackHandler = getTracingV2CallbackHandler;
