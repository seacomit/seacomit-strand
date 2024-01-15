/* eslint-disable no-restricted-globals */

import StrandFactory from "../drawing/StrandFactory";
import TriangularStrand from "../drawing/TriangularStrand";
import IMathWorkerRequestMessage from "./IMathWorkerRequestMessage";

self.onmessage = (e: MessageEvent<IMathWorkerRequestMessage>) => {
    // Reconstruct the strand
    const strandFactory = new StrandFactory();
    const strand = strandFactory.build(e.data.strand);
    strand.loadUpTo(e.data.offset - 1);
    self.postMessage(strand);
};

export {};