import { Component, createRef } from 'react';
import StrandRenderer from './drawing/StrandRenderer';

class StrandCanvasComponent extends Component {
  canvasRef = createRef<HTMLCanvasElement>();
  strandRenderer = new StrandRenderer();

  render() {
    return <canvas ref={this.canvasRef} data-testid="strand-canvas" />;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 300;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.strandRenderer.render(ctx, canvas.width, canvas.height);
      }
    }
  }
}

export default StrandCanvasComponent;
