import React, { Component, createRef } from 'react';

class StrandCanvasComponent extends Component {
  canvasRef = createRef<HTMLCanvasElement>();

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 300;
      const ctx = canvas.getContext('2d');
      // You can now draw on the canvas
      if (ctx) {
        ctx.fillStyle = '#140033';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }8

  render() {
    return <canvas ref={this.canvasRef} height="500" />;
  }
}

export default StrandCanvasComponent;
