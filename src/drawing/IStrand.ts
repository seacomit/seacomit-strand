import INumberProperties from "./INumberProperties";

interface IStrand {
    loadUpTo: (index: number, progressFn:Function) => void;
    get: (index: bigint) => INumberProperties;
    getLine: () => INumberProperties[];
    toString: () => string;
}

export default IStrand;
