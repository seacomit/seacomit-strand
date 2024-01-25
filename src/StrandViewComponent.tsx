import './StrandViewComponent.css';
import { useEffect, useState } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';
import NumberLineStrand from './drawing/NumberLineStrand';
import IStrand from './drawing/IStrand';
import TriangularStrand from './drawing/TriangularStrand';
import StrandFactory from './drawing/StrandFactory';
import PrimeMath from './primes/PrimeMath';
import IFactorLockTest from './primes/FactorLockTest';
import ControlBoxComponent from './ControlBoxComponent';

export default function StrandViewComponent() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [offset, setOffset] = useState(0);
  const [waveStartN, setWaveStartN] = useState(11);
  const [factorLockM, setFactorLockM] = useState(2);
  const [currentStrand, setCurrentStrand] = useState<IStrand>(new NumberLineStrand());
  const [isWorking, setIsWorking] = useState(false);
  const [progressCurrent, setProgressCurrent] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const [factorLockState, setFactorLockState] = useState<IFactorLockTest[]>([]);
  const [worker, setWorker] = useState<Worker|null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    const handleKeydown = (ev: KeyboardEvent) => {
      let desiredOffset = offset;
      if (ev.key === 'ArrowLeft') {
        // Left arrow key pressed
        desiredOffset--;
      } else if (ev.key === 'ArrowRight') {
        // Right arrow key pressed
        desiredOffset++;
      }
  
      if (currentStrand.getLine().length < (desiredOffset + 100)) {
        handleLoadRequest(currentStrand, desiredOffset, currentStrand.getLine().length + 100);
      } else {
        setOffset(Math.max(desiredOffset, 0));
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeydown);
    return (() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeydown);
    });
  });
  
  function handleLoadRequest(strand:IStrand, offset:number, quantity:number): void {
    if (isWorking) return;
    if (worker) {
      worker.terminate();
    }
    const theWorker = new Worker(new URL("./primes/MathWorker.ts", import.meta.url));
    // Send data to worker
    theWorker.postMessage({
      strand: strand,
      offset: offset + quantity,
    });

    setIsWorking(true);
    setWorker(theWorker);

    // Listen for messages from the worker
    theWorker.onmessage = (event) => {
      if (event.data.isProgress) {
        setProgressCurrent(event.data.current);
        setProgressTotal(event.data.total);
      } else {
        const strandFactory = new StrandFactory();
        const result = PrimeMath.calculateLockedPrimeFactors(BigInt(waveStartN), BigInt(factorLockM), 250, 0);
        setCurrentStrand(strandFactory.build(event.data));
        setOffset(offset);
        setFactorLockState(result);
        setIsWorking(false);
      }
    };

    // Listen for any errors from the worker
    theWorker.onerror = (event) => {
        console.error("Worker error: ", event.message);
        setIsWorking(false);
    };
  }

  function handleLockClick(): void {
      if (isWorking) {
          if (worker) {
              worker.terminate();
              setWorker(null);
          }
          setIsWorking(false);
      } else {
          handleLoadRequest(new TriangularStrand(BigInt(waveStartN), BigInt(factorLockM), currentStrand), 0, 100);
      }
  }

  function handleUnlockClick(): void {
    if (currentStrand as TriangularStrand != null) {
      setCurrentStrand((currentStrand as TriangularStrand).baseStrand);
    }
  }

  function handleStartNInput(ev: React.ChangeEvent<HTMLInputElement>): void {
    setWaveStartN(Number.parseInt(ev.target.value));
  }

  function handleFactorLockMInput(ev: React.ChangeEvent<HTMLInputElement>): void {
    setFactorLockM(Number.parseInt(ev.target.value));
  }

  return <div className="Container">
            {isWorking ? 
            <div className="LoadingOverlay">
              <div>Loading: {progressCurrent}/{progressTotal}</div>
              <div>
                <button className="LockButton" onClick={() => handleLockClick()}>{"Cancel"}</button>
              </div>
            </div> 
            : ''}
            <ControlBoxComponent isWorking={isWorking} waveStartN={waveStartN} factorLockM={factorLockM} currentStrand={currentStrand} factorLockState={factorLockState}
                                 handleLockClick={handleLockClick} handleUnlockClick={handleUnlockClick} handleStartNInput={handleStartNInput} handleFactorLockMInput={handleFactorLockMInput}/>
            <StrandCanvasComponent width={width} height={height} offset={offset} strand={currentStrand} />
         </div>;
};
