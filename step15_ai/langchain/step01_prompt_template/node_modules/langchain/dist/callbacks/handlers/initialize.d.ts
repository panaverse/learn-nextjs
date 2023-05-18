import { LangChainTracer } from "./tracer_langchain.js";
import { LangChainTracerV1 } from "./tracer_langchain_v1.js";
export declare function getTracingCallbackHandler(session?: string): Promise<LangChainTracerV1>;
export declare function getTracingV2CallbackHandler(): Promise<LangChainTracer>;
