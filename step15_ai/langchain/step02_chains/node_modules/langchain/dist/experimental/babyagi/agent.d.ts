import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { BaseChain, ChainInputs } from "../../chains/base.js";
import { SerializedBaseChain } from "../../chains/serde.js";
import { ChainValues } from "../../schema/index.js";
import { Optional } from "../../types/type-utils.js";
import { VectorStore } from "../../vectorstores/base.js";
export interface Task {
    taskID: string;
    taskName: string;
}
export interface BabyAGIInputs extends Omit<ChainInputs, "memory" | "callbackManager"> {
    creationChain: BaseChain;
    prioritizationChain: BaseChain;
    executionChain: BaseChain;
    vectorstore: VectorStore;
    maxIterations?: number;
}
export declare class BabyAGI extends BaseChain implements BabyAGIInputs {
    taskList: Task[];
    creationChain: BaseChain;
    prioritizationChain: BaseChain;
    executionChain: BaseChain;
    taskIDCounter: number;
    vectorstore: VectorStore;
    maxIterations: number;
    constructor({ creationChain, prioritizationChain, executionChain, vectorstore, maxIterations, verbose, callbacks, }: BabyAGIInputs);
    _chainType(): "BabyAGI";
    get inputKeys(): string[];
    get outputKeys(): never[];
    addTask(task: Task): Promise<void>;
    printTaskList(): void;
    printNextTask(task: Task): void;
    printTaskResult(result: string): void;
    getNextTasks(result: string, task_description: string, objective: string, runManager?: CallbackManagerForChainRun): Promise<Optional<Task, "taskID">[]>;
    prioritizeTasks(thisTaskID: number, objective: string, runManager?: CallbackManagerForChainRun): Promise<{
        taskID: string;
        taskName: string;
    }[]>;
    getTopTasks(query: string, k?: number): Promise<string[]>;
    executeTask(objective: string, task: string, runManager?: CallbackManagerForChainRun): Promise<string>;
    _call({ objective, firstTask }: ChainValues, runManager?: CallbackManagerForChainRun): Promise<{}>;
    serialize(): SerializedBaseChain;
    static fromLLM({ llm, vectorstore, executionChain, verbose, callbacks, ...rest }: Optional<BabyAGIInputs, "executionChain" | "creationChain" | "prioritizationChain"> & {
        llm: BaseLanguageModel;
    }): BabyAGI;
}
