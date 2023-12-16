import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';

interface ParentComponentState {
    width: number;
    height: number;
}

class StrandViewComponent extends Component<{}, ParentComponentState> {
  boundHandleResize: (this: Window, ev: UIEvent) => void;

  constructor(props: {}) {    
    super(props);
    this.boundHandleResize = this.handleResize.bind(this);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  render() {
    const {width, height} = this.state;
    return <StrandCanvasComponent width={width} height={height} />;
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.boundHandleResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.boundHandleResize);
  }

  handleResize(): void {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
}

export default StrandViewComponent;
