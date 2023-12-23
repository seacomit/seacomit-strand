import IStrand from "./IStrand";
import NumberLineStrand from "./NumberLineStrand";
import TriangularStrand from "./TriangularStrand";

/**
 * Used to reconstruct strands from raw data.
 */
class StrandFactory {

    build(data:any): IStrand {
        // flatten strand objects
        const strandData = [];
        let currentStrand = data;
        while (true) {
            if (currentStrand.baseStrand) {
                // triangular strand
                let nextStrand = currentStrand.baseStrand;
                currentStrand.baseStrand = null;
                strandData.push(currentStrand);
                currentStrand = nextStrand;
            } else {
                // number line strand
                strandData.push(currentStrand);
                break;
            }
        }

        let strand = new NumberLineStrand();
        strand.numberCache = strandData[strandData.length - 1].numberCache;
        strand.numberLine = strandData[strandData.length - 1].numberLine;

        let strandToBuild: IStrand = strand;
        for (let i = strandData.length - 2; i >= 0; i--) {
            const nextStrand = strandData[i];
            const triStrand = new TriangularStrand(nextStrand.startIndex, nextStrand.multiplier, strandToBuild);
            triStrand.numberLine = nextStrand.numberLine;
            strandToBuild = triStrand;
        }

        return strandToBuild;
    }
}

export default StrandFactory;
