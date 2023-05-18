import { AgentAction, AgentFinish, BaseChatMessage, ChainValues, LLMResult } from "../schema/index.js";
import { BaseCallbackHandler, CallbackHandlerMethods } from "./base.js";
type BaseCallbackManagerMethods = {
    [K in keyof CallbackHandlerMethods]?: (...args: Parameters<Required<CallbackHandlerMethods>[K]>) => Promise<unknown>;
};
export interface CallbackManagerOptions {
    verbose?: boolean;
    tracing?: boolean;
}
export type Callbacks = CallbackManager | (BaseCallbackHandler | CallbackHandlerMethods)[];
export declare abstract class BaseCallbackManager {
    abstract addHandler(handler: BaseCallbackHandler): void;
    abstract removeHandler(handler: BaseCallbackHandler): void;
    abstract setHandlers(handlers: BaseCallbackHandler[]): void;
    setHandler(handler: BaseCallbackHandler): void;
}
declare class BaseRunManager {
    readonly runId: string;
    protected readonly handlers: BaseCallbackHandler[];
    protected readonly inheritableHandlers: BaseCallbackHandler[];
    protected readonly _parentRunId?: string | undefined;
    constructor(runId: string, handlers: BaseCallbackHandler[], inheritableHandlers: BaseCallbackHandler[], _parentRunId?: string | undefined);
    handleText(text: string): Promise<void>;
}
export declare class CallbackManagerForLLMRun extends BaseRunManager implements BaseCallbackManagerMethods {
    handleLLMNewToken(token: string): Promise<void>;
    handleLLMError(err: Error | unknown): Promise<void>;
    handleLLMEnd(output: LLMResult): Promise<void>;
}
export declare class CallbackManagerForChainRun extends BaseRunManager implements BaseCallbackManagerMethods {
    getChild(): CallbackManager;
    handleChainError(err: Error | unknown): Promise<void>;
    handleChainEnd(output: ChainValues): Promise<void>;
    handleAgentAction(action: AgentAction): Promise<void>;
    handleAgentEnd(action: AgentFinish): Promise<void>;
}
export declare class CallbackManagerForToolRun extends BaseRunManager implements BaseCallbackManagerMethods {
    getChild(): CallbackManager;
    handleToolError(err: Error | unknown): Promise<void>;
    handleToolEnd(output: string): Promise<void>;
}
export declare class CallbackManager extends BaseCallbackManager implements BaseCallbackManagerMethods {
    handlers: BaseCallbackHandler[];
    inheritableHandlers: BaseCallbackHandler[];
    name: string;
    private readonly _parentRunId?;
    constructor(parentRunId?: string);
    handleLLMStart(llm: {
        name: string;
    }, prompts: string[], runId?: string, _parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined): Promise<CallbackManagerForLLMRun>;
    handleChatModelStart(llm: {
        name: string;
    }, messages: BaseChatMessage[][], runId?: string, _parentRunId?: string | undefined, extraParams?: Record<string, unknown> | undefined): Promise<CallbackManagerForLLMRun>;
    handleChainStart(chain: {
        name: string;
    }, inputs: ChainValues, runId?: string): Promise<CallbackManagerForChainRun>;
    handleToolStart(tool: {
        name: string;
    }, input: string, runId?: string): Promise<CallbackManagerForToolRun>;
    addHandler(handler: BaseCallbackHandler, inherit?: boolean): void;
    removeHandler(handler: BaseCallbackHandler): void;
    setHandlers(handlers: BaseCallbackHandler[], inherit?: boolean): void;
    copy(additionalHandlers?: BaseCallbackHandler[], inherit?: boolean): CallbackManager;
    static fromHandlers(handlers: CallbackHandlerMethods): CallbackManager;
    static configure(inheritableHandlers?: Callbacks, localHandlers?: Callbacks, options?: CallbackManagerOptions): Promise<CallbackManager | undefined>;
}
export {};
