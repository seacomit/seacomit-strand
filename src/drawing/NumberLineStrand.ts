import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * The number line starting at 0.
 */
class NumberLineStrand implements IStrand {
    numberCache: INumberProperties[];

    constructor() {
        this.numberCache = [];
    }

    loadUpTo(index: number) {
        if (index >= this.numberCache.length) {
          const startingIndex = this.numberCache.length;
          const iterations = (index + 1) - this.numberCache.length;
          for (let i = 0; i < iterations; i++) {
            const n = startingIndex + i;
            let factors: number[] = [];
            if (n != 0) {
                factors = PrimeMath.getPrimeFactors(n);    
            }
            
            const numberProperties = {
              n: n,
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

export default NumberLineStrand;
