import PrimeMath from "../primes/PrimeMath";
import INumberProperties from "./INumberProperties";
import IStrand from "./IStrand";

/**
 * The number line starting at 0.
 */
class NumberLineStrand implements IStrand {
    numberCache: Map<bigint, INumberProperties>;
    numberLine: INumberProperties[];

    constructor() {
        this.numberCache = new Map<bigint, INumberProperties>();
        this.numberLine = [];
        this.loadUpTo(100, () => {});
    }

    loadUpTo(index: number, progressFn:Function) {
        if (index >= this.numberLine.length) {
          progressFn({isProgress: true, current: 0, total: index});
          const startingIndex = this.numberLine.length;
          const iterations = (index + 1) - this.numberLine.length;
          for (let i = 0; i < iterations; i++) {
            const n = BigInt(startingIndex + i);
            if (this.numberCache.has(n)) {
              this.numberLine.push(this.numberCache.get(n)!);
            } else {
              this.numberLine.push(this.addNumber(n));
            }
            progressFn({isProgress: true, current: i, total: index});
          }
        }
    }

    addNumber(n: bigint): INumberProperties {
      const factors = PrimeMath.getPrimeFactors(BigInt(n));
      const numberProperties = {
        n: BigInt(n),
        prime: factors.length === 1,
        factors: factors,
      };
      this.numberCache.set(n, numberProperties);
      return numberProperties;
    }

    get(index: bigint): INumberProperties {
      if (!this.numberCache.has(index)) {
        this.addNumber(index);
      }

      return this.numberCache.get(index)!;
    }

    getLine(): INumberProperties[] {
      return this.numberLine;
    }

    toString(): string {
      return "NumberLine";
    }
}

export default NumberLineStrand;
