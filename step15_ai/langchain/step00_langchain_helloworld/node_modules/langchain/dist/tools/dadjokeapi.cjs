"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DadJokeAPI = void 0;
const base_js_1 = require("./base.cjs");
class DadJokeAPI extends base_js_1.Tool {
    constructor() {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = "dadjoke";
        this.description =
            "a dad joke generator. get a dad joke about a specific topic. input should be a search term.";
    }
    /** @ignore */
    async _call(input) {
        const headers = { Accept: "application/json" };
        const searchUrl = `https://icanhazdadjoke.com/search?term=${input}`;
        const response = await fetch(searchUrl, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        const jokes = data.results;
        if (jokes.length === 0) {
            return `No dad jokes found about ${input}`;
        }
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex].joke;
        return randomJoke;
    }
}
exports.DadJokeAPI = DadJokeAPI;
