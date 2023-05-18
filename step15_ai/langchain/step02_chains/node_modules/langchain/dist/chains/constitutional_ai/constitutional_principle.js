export class ConstitutionalPrinciple {
    constructor({ critiqueRequest, revisionRequest, name, }) {
        Object.defineProperty(this, "critiqueRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "revisionRequest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.critiqueRequest = critiqueRequest;
        this.revisionRequest = revisionRequest;
        this.name = name ?? "Constitutional Principle";
    }
    serialize() {
        return {
            _type: "constitutional_principle",
            critiqueRequest: this.critiqueRequest,
            revisionRequest: this.revisionRequest,
            name: this.name,
        };
    }
}
export const PRINCIPLES = {};
