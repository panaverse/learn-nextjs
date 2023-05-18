import { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { BaseChatMessage, BaseListChatMessageHistory } from "../../schema/index.js";
export interface DynamoDBChatMessageHistoryFields {
    tableName: string;
    sessionId: string;
    partitionKey?: string;
    sortKey?: string;
    messageAttributeName?: string;
    config?: DynamoDBClientConfig;
}
export declare class DynamoDBChatMessageHistory extends BaseListChatMessageHistory {
    private tableName;
    private sessionId;
    private client;
    private partitionKey;
    private sortKey?;
    private messageAttributeName;
    private dynamoKey;
    constructor({ tableName, sessionId, partitionKey, sortKey, messageAttributeName, config, }: DynamoDBChatMessageHistoryFields);
    getMessages(): Promise<BaseChatMessage[]>;
    clear(): Promise<void>;
    protected addMessage(message: BaseChatMessage): Promise<void>;
}
