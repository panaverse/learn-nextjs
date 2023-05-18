import { Tool } from "./base.js";
export class RequestsGetTool extends Tool {
    constructor(headers = {}, { maxOutputLength } = {}) {
        super();
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: headers
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "requests_get"
        });
        Object.defineProperty(this, "maxOutputLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2000
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `A portal to the internet. Use this when you need to get specific content from a website. 
  Input should be a  url (i.e. https://www.google.com). The output will be the text response of the GET request.`
        });
        this.maxOutputLength = maxOutputLength ?? this.maxOutputLength;
    }
    /** @ignore */
    async _call(input) {
        const res = await fetch(input, {
            headers: this.headers,
        });
        const text = await res.text();
        return text.slice(0, this.maxOutputLength);
    }
}
export class RequestsPostTool extends Tool {
    constructor(headers = {}, { maxOutputLength } = {}) {
        super();
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: headers
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "requests_post"
        });
        Object.defineProperty(this, "maxOutputLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Infinity
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `Use this when you want to POST to a website.
  Input should be a json string with two keys: "url" and "data".
  The value of "url" should be a string, and the value of "data" should be a dictionary of 
  key-value pairs you want to POST to the url as a JSON body.
  Be careful to always use double quotes for strings in the json string
  The output will be the text response of the POST request.`
        });
        this.maxOutputLength = maxOutputLength ?? this.maxOutputLength;
    }
    /** @ignore */
    async _call(input) {
        try {
            const { url, data } = JSON.parse(input);
            const res = await fetch(url, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            const text = await res.text();
            return text.slice(0, this.maxOutputLength);
        }
        catch (error) {
            return `${error}`;
        }
    }
}
