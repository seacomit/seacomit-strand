import './StrandViewComponent.css';
import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';

interface LockProperties {
  startN: number;
  multiplier: number;
}

interface ParentComponentState {
    width: number;
    height: number;
    offset: number;
    waveStartN: number;
    factorLockM: number;
    lockSequence: LockProperties[];
}

class StrandViewComponent extends Component<{}, ParentComponentState> {
  boundHandleResize: (this: Window, ev: UIEvent) => void;
  boundHandleKeydown: (this: Window, ev: KeyboardEvent) => void;

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
      lockSequence: [],
    }
  }

  render() {
    const {width, height, offset, waveStartN, factorLockM} = this.state;
    function lockPropertiesToString(lockProperties: LockProperties[]):string {
      let output = "";
      lockProperties.forEach((lockProp: LockProperties) => {
        output += " -> " + lockProp.startN + " (" + lockProp.multiplier + ")";
      });
      return output;
    }
    return <div className="Container">
             <div className="ControlBox">
              <label className="InputLabel">Starting Prime: </label>
              <input type='number' value={waveStartN} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleStartNInput(ev)} />
              <label className="InputLabel">Triangular Number Multiple: </label>
              <input type='number' value={factorLockM} onInput={(ev: React.ChangeEvent<HTMLInputElement>) => this.handleFactorLockMInput(ev)} />
              <button className="LockButton" onClick={() => this.handleLockClick()}>Lock</button>
              <button className="LockButton" onClick={() => this.handleUnlockClick()}>Unlock</button>
              <div className="LockSequenceText">{lockPropertiesToString(this.state.lockSequence)}</div>
             </div>
             <StrandCanvasComponent width={width} height={height} offset={offset} />
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
    let lockSequence = this.state.lockSequence;
    lockSequence.push(
      {
        startN: this.state.waveStartN,
        multiplier: this.state.factorLockM,
      }
    );
    this.setState({
      lockSequence: lockSequence,
    });
  }

  handleUnlockClick(): void {
    let lockSequence = this.state.lockSequence;
    lockSequence.pop();
    this.setState({
      lockSequence: lockSequence,
    });
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

