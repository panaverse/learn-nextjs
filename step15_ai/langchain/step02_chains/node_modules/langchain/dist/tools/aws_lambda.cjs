"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSLambda = void 0;
const dynamic_js_1 = require("./dynamic.cjs");
class AWSLambda extends dynamic_js_1.DynamicTool {
    constructor({ name, description, ...rest }) {
        super({
            name,
            description,
            func: async (input) => this._func(input),
        });
        Object.defineProperty(this, "lambdaConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.lambdaConfig = rest;
    }
    /** @ignore */
    async _func(input) {
        const { Client, Invoker } = await LambdaImports();
        const clientConstructorArgs = {};
        if (this.lambdaConfig.region) {
            clientConstructorArgs.region = this.lambdaConfig.region;
        }
        if (this.lambdaConfig.accessKeyId && this.lambdaConfig.secretAccessKey) {
            clientConstructorArgs.credentials = {
                accessKeyId: this.lambdaConfig.accessKeyId,
                secretAccessKey: this.lambdaConfig.secretAccessKey,
            };
        }
        const lambdaClient = new Client(clientConstructorArgs);
        return new Promise((resolve) => {
            const payloadUint8Array = new TextEncoder().encode(JSON.stringify(input));
            const command = new Invoker({
                FunctionName: this.lambdaConfig.functionName,
                InvocationType: "RequestResponse",
                Payload: payloadUint8Array,
            });
            lambdaClient
                .send(command)
                .then((response) => {
                const responseData = JSON.parse(new TextDecoder().decode(response.Payload));
                resolve(responseData.body ? responseData.body : "request completed.");
            })
                .catch((error) => {
                console.error("Error invoking Lambda function:", error);
                resolve("failed to complete request");
            });
        });
    }
}
exports.AWSLambda = AWSLambda;
async function LambdaImports() {
    try {
        const { LambdaClient, InvokeCommand } = await import("@aws-sdk/client-lambda");
        return {
            Client: LambdaClient,
            Invoker: InvokeCommand,
        };
    }
    catch (e) {
        console.error(e);
        throw new Error("Failed to load @aws-sdk/client-lambda'. Please install it eg. `yarn add @aws-sdk/client-lambda`.");
    }
}
