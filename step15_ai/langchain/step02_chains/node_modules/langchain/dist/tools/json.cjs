"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonGetValueTool = exports.JsonListKeysTool = exports.JsonSpec = void 0;
const jsonpointer_1 = __importDefault(require("jsonpointer"));
const base_js_1 = require("./base.cjs");
class JsonSpec {
    constructor(obj, max_value_length = 4000) {
        Object.defineProperty(this, "obj", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxValueLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4000
        });
        this.obj = obj;
        this.maxValueLength = max_value_length;
    }
    getKeys(input) {
        const pointer = jsonpointer_1.default.compile(input);
        const res = pointer.get(this.obj);
        if (typeof res === "object" && !Array.isArray(res) && res !== null) {
            return Object.keys(res).join(", ");
        }
        throw new Error(`Value at ${input} is not a dictionary, get the value directly instead.`);
    }
    getValue(input) {
        const pointer = jsonpointer_1.default.compile(input);
        const res = pointer.get(this.obj);
        if (res === null || res === undefined) {
            throw new Error(`Value at ${input} is null or undefined.`);
        }
        const str = typeof res === "object" ? JSON.stringify(res) : res.toString();
        if (typeof res === "object" &&
            !Array.isArray(res) &&
            str.length > this.maxValueLength) {
            return `Value is a large dictionary, should explore its keys directly.`;
        }
        if (str.length > this.maxValueLength) {
            return `${str.slice(0, this.maxValueLength)}...`;
        }
        return str;
    }
}
exports.JsonSpec = JsonSpec;
class JsonListKeysTool extends base_js_1.Tool {
    constructor(jsonSpec) {
        super();
        Object.defineProperty(this, "jsonSpec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: jsonSpec
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "json_list_keys"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Can be used to list all keys at a given path. 
    Before calling this you should be SURE that the path to this exists.
    The input is a text representation of the path to the json as json pointer syntax (e.g. /key1/0/key2).`
        });
    }
    /** @ignore */
    async _call(input) {
        try {
            return this.jsonSpec.getKeys(input);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.JsonListKeysTool = JsonListKeysTool;
class JsonGetValueTool extends base_js_1.Tool {
    constructor(jsonSpec) {
        super();
        Object.defineProperty(this, "jsonSpec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: jsonSpec
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "json_get_value"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Can be used to see value in string format at a given path.
    Before calling this you should be SURE that the path to this exists.
    The input is a text representation of the path to the json as json pointer syntax (e.g. /key1/0/key2).`
        });
    }
    /** @ignore */
    async _call(input) {
        try {
            return this.jsonSpec.getValue(input);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
exports.JsonGetValueTool = JsonGetValueTool;
