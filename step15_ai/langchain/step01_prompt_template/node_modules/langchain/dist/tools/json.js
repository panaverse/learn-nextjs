import jsonpointer from "jsonpointer";
import { Tool } from "./base.js";
export class JsonSpec {
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
        const pointer = jsonpointer.compile(input);
        const res = pointer.get(this.obj);
        if (typeof res === "object" && !Array.isArray(res) && res !== null) {
            return Object.keys(res).join(", ");
        }
        throw new Error(`Value at ${input} is not a dictionary, get the value directly instead.`);
    }
    getValue(input) {
        const pointer = jsonpointer.compile(input);
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
export class JsonListKeysTool extends Tool {
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
export class JsonGetValueTool extends Tool {
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
