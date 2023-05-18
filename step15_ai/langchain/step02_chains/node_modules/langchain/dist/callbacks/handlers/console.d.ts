import { BaseTracer, Run } from "./tracer.js";
export declare class ConsoleCallbackHandler extends BaseTracer {
    name: "console_callback_handler";
    protected persistRun(_run: Run): Promise<void>;
    getParents(run: Run): Run[];
    getBreadcrumbs(run: Run): string;
    onChainStart(run: Run): void;
    onChainEnd(run: Run): void;
    onChainError(run: Run): void;
    onLLMStart(run: Run): void;
    onLLMEnd(run: Run): void;
    onLLMError(run: Run): void;
    onToolStart(run: Run): void;
    onToolEnd(run: Run): void;
    onToolError(run: Run): void;
    onAgentAction(run: Run): void;
}
