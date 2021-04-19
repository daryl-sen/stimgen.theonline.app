const painter = () => {

  const setupCanvasContext = (canvasID) => {
    const targetCanvas = document.getElementById(canvasID);
    [targetCanvas.width, targetCanvas.height] = [CONFIG.imageWidth, CONFIG.imageHeight];
    const canvasContext = targetCanvas.getContext('2d');
    
    const originalFillStyle = canvasContext.fillStyle;
    canvasContext.fillStyle = CONFIG.imageBackground;
    canvasContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    canvasContext.fillStyle = originalFillStyle;
  
    return canvasContext;
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

  const convertMarginToAngle = (margin) => {
    return Math.asin(margin / CONFIG.radial.radius)
  }
  
  const generateRandomAngle = (min, max) => {
    return Math.random() * (max - min) + min;
  }
  
  const autoConfigRandomAngle = (sector, min, max) => {
    let angleStartOffset;
    let angleEndOffset;

    switch (sector) {
      case 1:
        angleStartOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectHeight / 2);
        angleEndOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectWidth / 2);
        break;
      case 2:
        angleStartOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectWidth / 2);
        angleEndOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectHeight / 2);
        break;
      case 3:
        angleStartOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectHeight / 2);
        angleEndOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectWidth / 2);
        break;
      case 4:
        angleStartOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectWidth / 2);
        angleEndOffset = convertMarginToAngle(CONFIG.centralMargins) + convertMarginToAngle(CONFIG.objectHeight / 2);
        break;
      default:
        return {}
    }

    return generateRandomAngle(
      min + angleStartOffset,
      max - angleEndOffset
    );
  }

  const setupCanvas = (targetContexts) => {
    for (const target of targetContexts) {
      if (CONFIG.fixationCross.show) {
        drawFixationCross(target, 0, 0);
      }
  
      if (CONFIG.debug) {
        showMargins(target);
        runCoordinateDistribution(1000, target);
      }
    }
  };

  const clearCanvas = (targetContexts) => {
    for (const target of targetContexts) {
      const originalFillStyle = target.fillStyle;
      target.fillStyle = '#000';
      target.fillRect(0, 0, target.canvas.width, target.canvas.height);
      target.fillStyle = originalFillStyle;
    }
    setupCanvas(targetContexts);
  }

  const sampleWithReplacement = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options.splice(randomIndex, 1)[0];
  };


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

  const drawSemiBlock = (context, coordinates, leftColor, rightColor) => {
    const leftOrigin = {
      x: coordinates.x - CONFIG.objectWidth / 2,
      y: coordinates.y - CONFIG.objectHeight / 2
    }
    const rightOrigin = {
      x: coordinates.x,
      y: coordinates.y - CONFIG.objectHeight / 2
    }

    const blocks = {
      left: {
        coordinates: leftOrigin,
        color: leftColor
      },
      right: {
        coordinates: rightOrigin,
        color: rightColor
      }
    }

    const originalFillStyle = context.fillStyle;
    for (const block in blocks) {
      context.fillStyle = blocks[block].color;
      context.fillRect(blocks[block].coordinates.x, blocks[block].coordinates.y, CONFIG.objectWidth / 2, CONFIG.objectHeight);
    }
    context.fillStyle = originalFillStyle;

  }

  const drawFullBlock = (context, coordinates, color) => {

  }

  const runCoordinateDistribution = (reps, context) => {
    coordinatesList = {};
    const originalFillStyle = context.fillStyle;
    for (let i = 0; i < reps; i++) {
      for (const sector of [1, 2, 3, 4]) {
        const angle = autoConfigRandomAngle(sector, 0, Math.PI / 2);
        const coordinates = generateCoordinatesFromAngle(angle, sector);
        context.fillStyle = 'red';
        context.fillRect(coordinates.x, coordinates.y, 1, 1);
      }
    }
    context.fillStyle = originalFillStyle;
  }

  const showGrid = () => {

  }

  const showMargins = (context) => {
    const originalStrokeStyle = context.strokeStyle;
    context.strokeStyle = 'red';
    // inner margins
    context.strokeRect(CONFIG.imageCenter.x - CONFIG.centralMargins, 0, CONFIG.centralMargins * 2, context.canvas.height);
    context.strokeRect(0, CONFIG.imageCenter.y - CONFIG.centralMargins, context.canvas.width, CONFIG.centralMargins * 2);
    // outer margins
    context.strokeRect(CONFIG.outerMargins, CONFIG.outerMargins, context.canvas.width - CONFIG.outerMargins * 2, context.canvas.height - CONFIG.outerMargins * 2);
    context.strokeStyle = originalStrokeStyle;
  };

  return {
    setupCanvasContext,
    drawFixationCross,
    generateRandomAngle,
    convertMarginToAngle,
    generateCoordinatesFromAngle,
    drawSemiBlock,
    runCoordinateDistribution,
    autoConfigRandomAngle,
    showGrid,
    showMargins,
    setupCanvas,
    clearCanvas,
    sampleWithReplacement
  }
}