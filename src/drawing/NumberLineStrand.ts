import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * The number line starting at 0.
 */
class NumberLineStrand implements IStrand {
    //numberCache: INumberProperties[];
    numberCache: Map<bigint, INumberProperties>;

    constructor() {
        this.numberCache = new Map<bigint, INumberProperties>();
    }

    /*loadUpTo(index: number) {
        if (index >= this.numberCache.size) {
          const startingIndex = this.numberCache.size;
          const iterations = (index + 1) - this.numberCache.size;
          for (let i = 0; i < iterations; i++) {
            const n = startingIndex + i;
            const factors = PrimeMath.getPrimeFactors(n);
            const numberProperties = {
              n: n,
              prime: factors.length === 1,
              factors: factors,
            };
            this.numberCache.set(n, numberProperties);
          }
        }
    }*/

    get(index: bigint): INumberProperties | undefined {
      if (!this.numberCache.has(index)) {
        const factors = PrimeMath.getPrimeFactors(index);
          const numberProperties = {
            n: index,
            prime: factors.length === 1,
            factors: factors,
          };
          this.numberCache.set(index, numberProperties);
      }

      return this.numberCache.get(index);
    }
}

export default NumberLineStrand;
