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

    loadUpTo(index: number, progressFn:Function) {
        if (index >= this.numberLine.length) {
          const totalToLoad = index - (this.numberLine.length);
          progressFn({isProgress: true, current: 0, total: totalToLoad});
          const arrayStartIndex = this.numberLine.length;
          const iterations = (index + 1) - this.numberLine.length;
          for (let i = 0; i < iterations; i++) {
            const triIndex = this.startIndex + PrimeMath.triangularN(BigInt(arrayStartIndex + i)) * this.multiplier;
            this.numberLine.push(this.baseStrand.get(triIndex));
            progressFn({isProgress: true, current: i, total: totalToLoad});
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
      return this.baseStrand.toString() + ` -> ${this.startIndex} (${this.multiplier})`;
    }
}

export default TriangularStrand;
