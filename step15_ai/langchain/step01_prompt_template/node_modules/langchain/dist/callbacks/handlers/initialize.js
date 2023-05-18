import { LangChainTracer } from "./tracer_langchain.js";
import { LangChainTracerV1 } from "./tracer_langchain_v1.js";
export async function getTracingCallbackHandler(session) {
    const tracer = new LangChainTracerV1();
    if (session) {
        await tracer.loadSession(session);
    }
    else {
        await tracer.loadDefaultSession();
    }
    return tracer;
}
export async function getTracingV2CallbackHandler() {
    return new LangChainTracer();
}
