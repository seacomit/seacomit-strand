import INumberProperties from "./INumberProperties";

interface IStrand {
    //loadUpTo: (index: number) => void;
    get: (index: bigint) => INumberProperties | undefined;
}

export default IStrand;
