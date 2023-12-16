import { Component, createRef } from 'react';
import StrandRenderer from './drawing/StrandRenderer';

interface StrandCanvasComponentProps {
  width: number;
  height: number;
}

class StrandCanvasComponent extends Component<StrandCanvasComponentProps> {
  canvasRef = createRef<HTMLCanvasElement>();
  strandRenderer = new StrandRenderer();

  render() {
    return <canvas ref={this.canvasRef} data-testid="strand-canvas" />;
  }

  componentDidMount(): void {
    this.redrawStrand();
  }

  componentDidUpdate(): void {
    this.redrawStrand();
  }

  redrawStrand() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const {width, height} = this.props;
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.strandRenderer.render(ctx, canvas.width, canvas.height);
      }
    }
  }
}

export default StrandCanvasComponent;
