import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * A number series generated using a multiple of the triangular number formula.
 */
class TriangularStrand implements IStrand {
    startIndex: bigint;
    multiplier: bigint;
    //numberCache: INumberProperties[];
    baseStrand: IStrand;

    constructor(startIndex: bigint, multiplier: bigint, baseStrand: IStrand) {
        this.startIndex = startIndex;
        this.multiplier = multiplier;
        //this.numberCache = [];
        this.baseStrand = baseStrand;
    }

    /*loadUpTo(index: number) {
        if (index >= this.numberCache.length) {
          const arrayStartIndex = this.numberCache.length;
          const iterations = (index + 1) - this.numberCache.length;
          this.baseStrand.loadUpTo(this.startIndex + PrimeMath.triangularN(arrayStartIndex + iterations) * this.multiplier);
          for (let i = 0; i < iterations; i++) {
            const triIndex = this.startIndex + PrimeMath.triangularN(arrayStartIndex + i) * this.multiplier;
            this.numberCache.push(this.baseStrand.get(triIndex));
          }
        }
    }*/

    get(index: bigint): INumberProperties | undefined {
      const triN = this.startIndex + PrimeMath.triangularN(index) * this.multiplier;
      return this.baseStrand.get(triN);   
    }
}

export default TriangularStrand;
