import INumberProperties from "./INumberProperties";

interface IStrand {
    loadUpTo: (index: number) => void;
    get: (index: number) => INumberProperties;
}

export default IStrand;
