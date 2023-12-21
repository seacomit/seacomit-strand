import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * A number series generated using a multiple of the triangular number formula.
 */
class TriangularStrand implements IStrand {
    startN: number;
    multiplier: number;
    numberCache: INumberProperties[];

    constructor(startN: number, multiplier: number) {
        this.startN = startN;
        this.multiplier = multiplier;
        this.numberCache = [];
    }

    loadUpTo(index: number) {
        if (index >= this.numberCache.length) {
          const startingIndex = this.numberCache.length;
          const iterations = (index + 1) - this.numberCache.length;
          for (let i = 0; i < iterations; i++) {
            const triN = this.startN + PrimeMath.triangularN(startingIndex + i) * this.multiplier;
            const factors = PrimeMath.getPrimeFactors(triN);
            const numberProperties = {
              n: triN,
              prime: factors.length === 1,
              factors: factors,
            };
            this.numberCache.push(numberProperties);
          }
        }
    }

    get(index: number) {
        if (index >= this.numberCache.length) {
            this.loadUpTo(index);
        }

        return this.numberCache[index];
    }
}

export default TriangularStrand;
