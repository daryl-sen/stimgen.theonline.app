const painter = () => {

  const setupCanvasContext = (canvasID) => {
    const targetCanvas = document.getElementById(canvasID);
    [targetCanvas.width, targetCanvas.height] = [CONFIG.imageWidth, CONFIG.imageHeight];
    const canvasContext = targetCanvas.getContext('2d');
    
    const originalFillStyle = canvasContext.fillStyle;
    canvasContext.fillStyle = CONFIG.imageBackground;
    canvasContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    canvasContext.fillStyle = originalFillStyle;
  
    return [
      canvasContext,
      targetCanvas
    ];
  }
  
  const drawFixationCross = (context, offsetX, offsetY) => {
    const originalFillStyle = context.fillStyle;
    const horizontalMidpoint = context.canvas.width / 2 + offsetX;
    const verticalMidpoint = context.canvas.height / 2 + offsetY;
  
    context.fillStyle = CONFIG.fixationCross.color;
    // horizontal line
    context.fillRect(
      horizontalMidpoint - CONFIG.fixationCross.length / 2,
      verticalMidpoint - CONFIG.fixationCross.thickness / 2,
      CONFIG.fixationCross.length,
      CONFIG.fixationCross.thickness
    );
    // vertical line
    context.fillRect(
      horizontalMidpoint - CONFIG.fixationCross.thickness / 2,
      verticalMidpoint - CONFIG.fixationCross.length / 2,
      CONFIG.fixationCross.thickness,
      CONFIG.fixationCross.length
    );
    context.fillStyle = originalFillStyle;
  };



  return {
    setupCanvasContext,
    drawFixationCross
  }
}