import { DynamoDBClient, GetItemCommand, UpdateItemCommand, DeleteItemCommand, } from "@aws-sdk/client-dynamodb";
import { BaseListChatMessageHistory, } from "../../schema/index.js";
import { mapChatMessagesToStoredMessages, mapStoredMessagesToChatMessages, } from "./utils.js";
export class DynamoDBChatMessageHistory extends BaseListChatMessageHistory {
    constructor({ tableName, sessionId, partitionKey, sortKey, messageAttributeName, config, }) {
        super();
        Object.defineProperty(this, "tableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "partitionKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "id"
        });
        Object.defineProperty(this, "sortKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "messageAttributeName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "messages"
        });
        Object.defineProperty(this, "dynamoKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tableName = tableName;
        this.sessionId = sessionId;
        this.client = new DynamoDBClient(config ?? {});
        this.partitionKey = partitionKey ?? this.partitionKey;
        this.sortKey = sortKey;
        this.messageAttributeName =
            messageAttributeName ?? this.messageAttributeName;
        this.dynamoKey = {};
        this.dynamoKey[this.partitionKey] = { S: this.sessionId };
        if (this.sortKey) {
            this.dynamoKey[this.sortKey] = { S: this.sortKey };
        }
    }
    async getMessages() {
        const params = {
            TableName: this.tableName,
            Key: this.dynamoKey,
        };
        const response = await this.client.send(new GetItemCommand(params));
        const items = response.Item
            ? response.Item[this.messageAttributeName]?.L ?? []
            : [];
        const messages = items
            .map((item) => ({
            type: item.M?.type.S,
            data: {
                role: item.M?.role?.S,
                content: item.M?.text.S,
            },
        }))
            .filter((x) => x.type !== undefined && x.data.content !== undefined);
        return mapStoredMessagesToChatMessages(messages);
    }
    async clear() {
        const params = {
            TableName: this.tableName,
            Key: this.dynamoKey,
        };
        await this.client.send(new DeleteItemCommand(params));
    }
    async addMessage(message) {
        const messages = mapChatMessagesToStoredMessages([message]);
        const params = {
            TableName: this.tableName,
            Key: this.dynamoKey,
            ExpressionAttributeNames: {
                "#m": this.messageAttributeName,
            },
            ExpressionAttributeValues: {
                ":empty_list": {
                    L: [],
                },
                ":m": {
                    L: messages.map((message) => {
                        const dynamoSerializedMessage = {
                            M: {
                                type: {
                                    S: message.type,
                                },
                                text: {
                                    S: message.data.content,
                                },
                            },
                        };
                        if (message.data.role) {
                            dynamoSerializedMessage.M.role = { S: message.data.role };
                        }
                        return dynamoSerializedMessage;
                    }),
                },
            },
            UpdateExpression: "SET #m = list_append(if_not_exists(#m, :empty_list), :m)",
        };
        await this.client.send(new UpdateItemCommand(params));
    }
}
