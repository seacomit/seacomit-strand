import './StrandViewComponent.css';
import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';
import NumberLineStrand from './drawing/NumberLineStrand';
import IStrand from './drawing/IStrand';
import TriangularStrand from './drawing/TriangularStrand';
import StrandFactory from './drawing/StrandFactory';
import PrimeMath from './primes/PrimeMath';

interface StrandViewComponentState {
    width: number;
    height: number;
    offset: number;
    waveStartN: number;
    factorLockM: number;
    currentStrand: IStrand;
    isWorking: boolean;
    lockedFactors: bigint[];
    notLockedFactors: bigint[];
}

class StrandViewComponent extends Component<{}, StrandViewComponentState> {
  boundHandleResize: (this: Window, ev: UIEvent) => void;
  boundHandleKeydown: (this: Window, ev: KeyboardEvent) => void;
  worker: Worker;

  constructor(props: {}) {    
    super(props);
    this.boundHandleResize = this.handleResize.bind(this);
    this.boundHandleKeydown = this.handleKeydown.bind(this);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      offset: 0,
      waveStartN: 11,
      factorLockM: 2,
      currentStrand: new NumberLineStrand(),
      isWorking: false,
      lockedFactors: [],
      notLockedFactors: [],
    }
    this.state.currentStrand.loadUpTo(99);
    this.worker = new Worker(new URL("./primes/MathWorker.ts", import.meta.url));
  }

  render() {
    const {width, height, offset, waveStartN, factorLockM} = this.state;
    return <div className="Container">
             <div className="ControlBox">
              <label className="InputLabel">Starting Prime: </label>
              <input type='number' value={waveStartN} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleStartNInput(ev)} />
              <label className="InputLabel">Triangular Number Multiple: </label>
              <input type='number' value={factorLockM} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleFactorLockMInput(ev)} />
              <button className="LockButton" onClick={() => this.handleLockClick()}>{this.state.isWorking ? "Cancel" : "Lock"}</button>
              <button disabled={this.state.isWorking || (this.state.currentStrand as TriangularStrand) == null} className="LockButton" onClick={() => this.handleUnlockClick()}>Unlock</button>
              <div className="LockSequenceText">{this.state.currentStrand.toString()}</div>
              <div className="LockedFactors">Locked: {this.state.lockedFactors.join(",")}</div>
              <div className="NotLockedFactors">Not Locked: {this.state.notLockedFactors.join(",")}</div>
             </div>
             <StrandCanvasComponent width={width} height={height} offset={offset} strand={this.state.currentStrand} />
           </div>;
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.boundHandleResize);
    window.addEventListener('keydown', this.boundHandleKeydown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.boundHandleResize);
    window.removeEventListener('keydown', this.boundHandleKeydown);
  }

  handleLockClick(): void {
    if (this.state.isWorking) {
      this.worker.terminate();
      this.worker = new Worker(new URL("./primes/MathWorker.ts", import.meta.url));
      this.setState({
        isWorking: false,
      });
    } else {
      // Send data to worker
      this.worker.postMessage(new TriangularStrand(BigInt(this.state.waveStartN), BigInt(this.state.factorLockM), this.state.currentStrand));
      
      this.setState({
        isWorking: true,
      });

      // Listen for messages from the worker
      this.worker.onmessage = (event) => {
        const strandFactory = new StrandFactory();
        const result = PrimeMath.calculateLockedPrimeFactors(BigInt(this.state.waveStartN), BigInt(this.state.factorLockM), 250, 0);
        this.setState({
          currentStrand: strandFactory.build(event.data),
          offset: 0,
          isWorking: false,
          lockedFactors: result[0],
          notLockedFactors: result[1],
        });
      };
      
      // Listen for any errors from the worker
      this.worker.onerror = (event) => {
          console.error("Worker error: ", event.message);
          this.setState({
            isWorking: false,
          });
      };
    }
  }

  handleUnlockClick(): void {
    let currentStrand = this.state.currentStrand;
    if (currentStrand as TriangularStrand != null) {
      this.setState({
        currentStrand: (currentStrand as TriangularStrand).baseStrand,
      });
    }
  }

  handleStartNInput(ev: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      waveStartN: Number.parseInt(ev.target.value),
    })
  }

  handleFactorLockMInput(ev: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      factorLockM: Number.parseInt(ev.target.value),
    })
  }

  handleKeydown(ev: KeyboardEvent):void {
    let offset = this.state.offset;
    if (ev.key === 'ArrowLeft') {
      // Left arrow key pressed
      offset--;
    } else if (ev.key === 'ArrowRight') {
      // Right arrow key pressed
      offset++;
    }

    const currentStrand = this.state.currentStrand;
    if (currentStrand.getLine().length < (offset + 100)) {
      currentStrand.loadUpTo(currentStrand.getLine().length + 100);
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      offset: Math.max(offset, 0),
    });
  }

  handleResize(): void {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      offset: this.state.offset,
    });
  }
}

export default StrandViewComponent;
