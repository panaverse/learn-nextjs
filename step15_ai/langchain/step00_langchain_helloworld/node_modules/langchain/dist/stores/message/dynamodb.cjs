"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBChatMessageHistory = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const index_js_1 = require("../../schema/index.cjs");
const utils_js_1 = require("./utils.cjs");
class DynamoDBChatMessageHistory extends index_js_1.BaseListChatMessageHistory {
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
        this.client = new client_dynamodb_1.DynamoDBClient(config ?? {});
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
        const response = await this.client.send(new client_dynamodb_1.GetItemCommand(params));
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
        return (0, utils_js_1.mapStoredMessagesToChatMessages)(messages);
    }
    async clear() {
        const params = {
            TableName: this.tableName,
            Key: this.dynamoKey,
        };
        await this.client.send(new client_dynamodb_1.DeleteItemCommand(params));
    }
    async addMessage(message) {
        const messages = (0, utils_js_1.mapChatMessagesToStoredMessages)([message]);
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
        await this.client.send(new client_dynamodb_1.UpdateItemCommand(params));
    }
}
exports.DynamoDBChatMessageHistory = DynamoDBChatMessageHistory;
