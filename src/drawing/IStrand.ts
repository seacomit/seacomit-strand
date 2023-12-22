import INumberProperties from "./INumberProperties";

interface IStrand {
    loadUpTo: (index: number) => void;
    get: (index: bigint) => INumberProperties;
    getLine: () => INumberProperties[];
}

export default IStrand;
