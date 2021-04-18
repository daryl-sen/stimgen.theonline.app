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

  const generateRandomAngle = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  const convertMarginToAngle = (margin) => {
    return Math.asin(margin / CONFIG.radial.radius)
  }

  const generateCoordinatesFromAngle = (angle, sector) => {
    const adjacent = CONFIG.radial.radius * Math.cos(angle);
    const opposite = CONFIG.radial.radius * Math.sin(angle);

    const coordinates = {};

    switch(sector) {
      case 1:
        coordinates.x = CONFIG.imageCenter.x + adjacent;
        coordinates.y = CONFIG.imageCenter.y - opposite;
        break;
      case 2:
        coordinates.x = CONFIG.imageCenter.x - opposite;
        coordinates.y = CONFIG.imageCenter.y - adjacent;
        break;
      case 3:
        coordinates.x = CONFIG.imageCenter.x - adjacent;
        coordinates.y = CONFIG.imageCenter.y + opposite;
        break;
      case 4:
        coordinates.x = CONFIG.imageCenter.x + opposite;
        coordinates.y = CONFIG.imageCenter.y + adjacent;
        break;
      default:
        return {}
    }

    coordinates.x = Math.floor(coordinates.x);
    coordinates.y = Math.floor(coordinates.y);

    return coordinates;
  };



  return {
    setupCanvasContext,
    drawFixationCross,
    generateRandomAngle,
    convertMarginToAngle,
    generateCoordinatesFromAngle
  }
}