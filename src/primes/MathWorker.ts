/* eslint-disable no-restricted-globals */

import StrandFactory from "../drawing/StrandFactory";
import TriangularStrand from "../drawing/TriangularStrand";

self.onmessage = (e: MessageEvent<TriangularStrand>) => {
    // Reconstruct the strand
    const strandFactory = new StrandFactory();
    const strand = strandFactory.build(e.data);
    strand.loadUpTo(100);
    self.postMessage(strand);
};

export {};