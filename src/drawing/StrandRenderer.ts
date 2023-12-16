import PrimeMath from "../primes/PrimeMath";

class StrandRenderer {
    render(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.fillStyle = '#140033';
        ctx.fillRect(0, 0, width, height);

        ctx.font = "10px Roboto";

        let firstN = 41;
        let nWidth = 100;
        let index = 0;

        let circleRadius = 5;

        for (let i = index; i < nWidth; i++) {
            const theN = firstN + PrimeMath.triangularN(i) * 2;
            const factors = PrimeMath.getPrimeFactors(theN);
            const isPrime = factors.length == 1;

            let displayText = theN + " (" + factors.toString() + ")";
            if (isPrime) {
                displayText = theN.toString();
            }
            const textMetrics = ctx.measureText(displayText);

            const numberScreenPosition = i * circleRadius * 4;
            ctx.beginPath();
            ctx.arc(numberScreenPosition, height / 2, circleRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = "#4dffb8";
            if (isPrime) {
                ctx.fillStyle = "#3385ff";
            } else {
                ctx.fillStyle = "#ff3385";
            }
            ctx.fill();
            ctx.stroke();
            
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 + textMetrics.width / 2 + circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            //ctx.fillText(theN.toString(), numberScreenPosition - (textMetrics.width / 2), height / 2 + 20);
            ctx.fillText(displayText, 0, 0);
            ctx.restore();
        }

    }
}

export default StrandRenderer;
