import INumberProperties from "./INumberProperties";

class NumberLineRenderer {

    render(numberLine: INumberProperties[], offset: number, ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.fillStyle = '#050008';//'#140033';
        ctx.fillRect(0, 0, width, height);

        const quantity = 100;
        const sectionLength = width / quantity;
        const circleRadius = sectionLength * 1/3;
        const gapBetweenN = sectionLength * 2/3;
        
        // Draw points and text.
        const firstN = numberLine[0].n;
        
        ctx.lineWidth = 2;
        ctx.font = "10px Roboto";
        for (let i = 0; i < quantity; i++) {
            const pseudoN = offset + i;
            const numberProperties = numberLine[offset + i];
            const theN = numberProperties.n;
            const factors = numberProperties.factors;
            const isPrime = numberProperties.prime;
            const numberScreenPosition = i * sectionLength + gapBetweenN;

            // Draw number circle.
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
            
            // Draw number text.
            let displayText = theN + " (" + factors.toString() + ")";
            if (isPrime) {
                displayText = theN.toString();
            }
            let textMetrics = ctx.measureText(displayText);
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 + textMetrics.width / 2 + circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            ctx.fillText(displayText, 0, 0);
            ctx.restore();

            const pseudoNMod = pseudoN % Number(firstN) + 1;
            const pseudoNDisplayText = firstN == 0n ? pseudoN.toString() : pseudoN + " (" + pseudoNMod +")";
            textMetrics = ctx.measureText(pseudoNDisplayText);
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 - textMetrics.width / 2 - circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            ctx.fillText(pseudoNDisplayText, 0, 0);
            ctx.restore();
        }
    }
}

export default NumberLineRenderer;
