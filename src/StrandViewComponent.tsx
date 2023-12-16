import { Component } from 'react';
import StrandCanvasComponent from './StrandCanvasComponent';

interface ParentComponentState {
    width: number;
    height: number;
}

class StrandViewComponent extends Component<{}, ParentComponentState> {
  constructor(props: {}) {    
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight - 300,
    }
  }

  render() {
    const {width, height} = this.state;
    return <StrandCanvasComponent width={width} height={height} />;
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize(): void {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 300,
    });
  }
}

export default StrandViewComponent;
