import './StrandViewComponent.css';
import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';
import NumberLineStrand from './drawing/NumberLineStrand';
import IStrand from './drawing/IStrand';
import TriangularStrand from './drawing/TriangularStrand';
import StrandFactory from './drawing/StrandFactory';
import PrimeMath from './primes/PrimeMath';
import IFactorLockTest from './primes/FactorLockTest';
import { off } from 'process';

interface StrandViewComponentState {
    width: number;
    height: number;
    offset: number;
    waveStartN: number;
    factorLockM: number;
    currentStrand: IStrand;
    isWorking: boolean;
    factorLockState: IFactorLockTest[];
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
      factorLockState: [],
    }
    this.state.currentStrand.loadUpTo(99);
    this.worker = new Worker(new URL("./primes/MathWorker.ts", import.meta.url));
  }

  render() {
    const {width, height, offset, waveStartN, factorLockM} = this.state;
    return <div className="Container">
             {this.state.isWorking ? 
              <div className="LoadingOverlay">
                <div>Loading</div>
                <div>
                  <button className="LockButton" onClick={() => this.handleLockClick()}>{"Cancel"}</button>
                </div>
              </div> 
             : ''}
             <div className="ControlBox">
              <label className="InputLabel">Starting Prime: </label>
              <input type='number' value={waveStartN} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleStartNInput(ev)} />
              <label className="InputLabel">Triangular Number Multiple: </label>
              <input type='number' value={factorLockM} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleFactorLockMInput(ev)} />
              <button className="LockButton" onClick={() => this.handleLockClick()}>Lock</button>
              <button disabled={this.state.isWorking || (this.state.currentStrand as TriangularStrand) == null} className="LockButton" onClick={() => this.handleUnlockClick()}>Unlock</button>
              <div className="LockSequenceText">{this.state.currentStrand.toString()}</div>
              <div className="LockedFactors">{this.state.factorLockState.map(factorLockTest => <span className={factorLockTest.locked ? "LockedFactorItem" : "NotLockedFactorItem"}>{factorLockTest.divisor.toString()}</span>)}</div>
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
      this.handleLoadRequest(new TriangularStrand(BigInt(this.state.waveStartN), BigInt(this.state.factorLockM), this.state.currentStrand), 0, 100);
    }
  }

  handleLoadRequest(strand:IStrand, offset:number, quantity:number): void {
    // Send data to worker
    this.worker.postMessage({
      strand: strand,
      offset: offset + quantity,
    });

    this.setState({
      isWorking: true,
    });

    // Listen for messages from the worker
    this.worker.onmessage = (event) => {
      const strandFactory = new StrandFactory();
      const result = PrimeMath.calculateLockedPrimeFactors(BigInt(this.state.waveStartN), BigInt(this.state.factorLockM), 250, 0);
      this.setState({
        currentStrand: strandFactory.build(event.data),
        offset: offset,
        isWorking: false,
        factorLockState: result,
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
    let desiredOffset = this.state.offset;
    if (ev.key === 'ArrowLeft') {
      // Left arrow key pressed
      desiredOffset--;
    } else if (ev.key === 'ArrowRight') {
      // Right arrow key pressed
      desiredOffset++;
    }

    const currentStrand = this.state.currentStrand;
    if (currentStrand.getLine().length < (desiredOffset + 100)) {
      this.handleLoadRequest(currentStrand, desiredOffset, currentStrand.getLine().length + 100);
    } else {
      this.setState({
        offset: Math.max(desiredOffset, 0),
      });
    }
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
