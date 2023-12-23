import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * A number series generated using a multiple of the triangular number formula.
 */
class TriangularStrand implements IStrand {
    startIndex: bigint;
    multiplier: bigint;
    baseStrand: IStrand;
    numberLine: INumberProperties[];

    constructor(startIndex: bigint, multiplier: bigint, baseStrand: IStrand) {
        this.startIndex = startIndex;
        this.multiplier = multiplier;
        this.baseStrand = baseStrand;
        this.numberLine = [];
    }

    loadUpTo(index: number) {
        if (index >= this.numberLine.length) {
          const arrayStartIndex = this.numberLine.length;
          const iterations = (index + 1) - this.numberLine.length;
          for (let i = 0; i < iterations; i++) {
            const triIndex = this.startIndex + PrimeMath.triangularN(BigInt(arrayStartIndex + i)) * this.multiplier;
            this.numberLine.push(this.baseStrand.get(triIndex));
          }
        }
    }

    get(index: bigint): INumberProperties {
      const triN = this.startIndex + PrimeMath.triangularN(index) * this.multiplier;
      return this.baseStrand.get(triN)!;   
    }

    getLine(): INumberProperties[] {
      return this.numberLine;
    }

    toString(): string {
      return `${this.startIndex} (${this.multiplier})`;
    }
}

export default TriangularStrand;
