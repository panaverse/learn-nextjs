"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidTemplate = exports.parseTemplate = exports.renderTemplate = exports.DEFAULT_PARSER_MAPPING = exports.DEFAULT_FORMATTER_MAPPING = exports.interpolateFString = exports.parseFString = void 0;
const parseFString = (template) => {
    // Core logic replicated from internals of pythons built in Formatter class.
    // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
    const chars = template.split("");
    const nodes = [];
    const nextBracket = (bracket, start) => {
        for (let i = start; i < chars.length; i += 1) {
            if (bracket.includes(chars[i])) {
                return i;
            }
        }
        return -1;
    };
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === "{" && i + 1 < chars.length && chars[i + 1] === "{") {
            nodes.push({ type: "literal", text: "{" });
            i += 2;
        }
        else if (chars[i] === "}" &&
            i + 1 < chars.length &&
            chars[i + 1] === "}") {
            nodes.push({ type: "literal", text: "}" });
            i += 2;
        }
        else if (chars[i] === "{") {
            const j = nextBracket("}", i);
            if (j < 0) {
                throw new Error("Unclosed '{' in template.");
            }
            nodes.push({
                type: "variable",
                name: chars.slice(i + 1, j).join(""),
            });
            i = j + 1;
        }
        else if (chars[i] === "}") {
            throw new Error("Single '}' in template.");
        }
        else {
            const next = nextBracket("{}", i);
            const text = (next < 0 ? chars.slice(i) : chars.slice(i, next)).join("");
            nodes.push({ type: "literal", text });
            i = next < 0 ? chars.length : next;
        }
    }
    return nodes;
};
exports.parseFString = parseFString;
const interpolateFString = (template, values) => (0, exports.parseFString)(template).reduce((res, node) => {
    if (node.type === "variable") {
        if (node.name in values) {
            return res + values[node.name];
        }
        throw new Error(`Missing value for input ${node.name}`);
    }
    return res + node.text;
}, "");
exports.interpolateFString = interpolateFString;
exports.DEFAULT_FORMATTER_MAPPING = {
    "f-string": exports.interpolateFString,
    jinja2: (_, __) => "",
};
exports.DEFAULT_PARSER_MAPPING = {
    "f-string": exports.parseFString,
    jinja2: (_) => [],
};
const renderTemplate = (template, templateFormat, inputValues) => exports.DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
exports.renderTemplate = renderTemplate;
const parseTemplate = (template, templateFormat) => exports.DEFAULT_PARSER_MAPPING[templateFormat](template);
exports.parseTemplate = parseTemplate;
const checkValidTemplate = (template, templateFormat, inputVariables) => {
    if (!(templateFormat in exports.DEFAULT_FORMATTER_MAPPING)) {
        const validFormats = Object.keys(exports.DEFAULT_FORMATTER_MAPPING);
        throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
    }
    try {
        const dummyInputs = inputVariables.reduce((acc, v) => {
            acc[v] = "foo";
            return acc;
        }, {});
        (0, exports.renderTemplate)(template, templateFormat, dummyInputs);
    }
    catch {
        throw new Error("Invalid prompt schema.");
    }
};
exports.checkValidTemplate = checkValidTemplate;
