import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';

interface ParentComponentState {
    width: number;
    height: number;
    offset: number;
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
    }
  }

  render() {
    const {width, height, offset} = this.state;
    return <StrandCanvasComponent width={width} height={height} offset={offset} />;
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.boundHandleResize);
    window.addEventListener('keydown', this.boundHandleKeydown);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.boundHandleResize);
    window.removeEventListener('keydown', this.boundHandleKeydown);
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
