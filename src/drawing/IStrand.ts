import INumberProperties from "./INumberProperties";

interface IStrand {
    //loadUpTo: (index: number) => void;
    get: (index: number) => INumberProperties | undefined;
}

export default IStrand;
