const painter = () => {
  const setupCanvasContext = (canvasID) => {
    const targetCanvas = document.getElementById(canvasID);
    [targetCanvas.width, targetCanvas.height] = [
      CONFIG.imageWidth,
      CONFIG.imageHeight,
    ];
    const canvasContext = targetCanvas.getContext("2d");

    const originalFillStyle = canvasContext.fillStyle;
    canvasContext.fillStyle = CONFIG.imageBackground;
    canvasContext.fillRect(0, 0, targetCanvas.width, targetCanvas.height);
    canvasContext.fillStyle = originalFillStyle;

    return canvasContext;
  };

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
    return Math.asin(margin / CONFIG.radial.radius);
  };

  const generateRandomAngle = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const autoConfigRandomAngle = (sector, min, max) => {
    let angleStartOffset;
    let angleEndOffset;

    switch (sector) {
      case 1:
        angleStartOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectHeight / 2);
        angleEndOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectWidth / 2);
        break;
      case 2:
        angleStartOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectWidth / 2);
        angleEndOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectHeight / 2);
        break;
      case 3:
        angleStartOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectHeight / 2);
        angleEndOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectWidth / 2);
        break;
      case 4:
        angleStartOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectWidth / 2);
        angleEndOffset =
          convertMarginToAngle(CONFIG.centralMargins) +
          convertMarginToAngle(CONFIG.objectHeight / 2);
        break;
      default:
        return {};
    }

    return generateRandomAngle(min + angleStartOffset, max - angleEndOffset);
  };

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
      target.fillStyle = CONFIG.imageBackground;
      target.fillRect(0, 0, target.canvas.width, target.canvas.height);
      target.fillStyle = originalFillStyle;
    }
    setupCanvas(targetContexts);
  };

  const sampleWithReplacement = (options) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options.splice(randomIndex, 1)[0];
  };

  const generateCoordinatesFromAngle = (angle, sector) => {
    const adjacent = CONFIG.radial.radius * Math.cos(angle);
    const opposite = CONFIG.radial.radius * Math.sin(angle);

    const coordinates = {};

    switch (sector) {
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
        return {};
    }

    coordinates.x = Math.floor(coordinates.x);
    coordinates.y = Math.floor(coordinates.y);

    return coordinates;
  };

  const drawSemiBlock = (
    context,
    coordinates,
    leftColor,
    rightColor,
    options
  ) => {
    let leftOrigin = {
      x: coordinates.x - CONFIG.objectWidth / 2,
      y: coordinates.y - CONFIG.objectHeight / 2,
    };
    let rightOrigin = {
      x: coordinates.x,
      y: coordinates.y - CONFIG.objectHeight / 2,
    };

    const blocks = {
      left: {
        coordinates: leftOrigin,
        color: leftColor,
      },
      right: {
        coordinates: rightOrigin,
        color: rightColor,
      },
    };

    if (options && options.gap) {
      leftOrigin.x =
        leftOrigin.x - (options.gap / 2) * (CONFIG.objectWidth / 2);
      rightOrigin.x =
        rightOrigin.x + (options.gap / 2) * (CONFIG.objectWidth / 2);

      const connectorThickness = 3;
      blocks.topLine = {
        coordinates: leftOrigin,
        color: leftColor,
        lineOnly: true,
        connectorThickness,
      };
      blocks.bottomLine = {
        coordinates: {
          x: leftOrigin.x + CONFIG.objectWidth / 2,
          y: coordinates.y + CONFIG.objectHeight / 2 - connectorThickness,
        },
        color: rightColor,
        lineOnly: true,
        connectorThickness,
      };
    }

    const originalFillStyle = context.fillStyle;
    for (const block in blocks) {
      context.fillStyle = blocks[block].color;
      console.log(blocks[block]);
      if (blocks[block].lineOnly && options.showLines === false) {
        continue;
      }
      context.fillRect(
        blocks[block].coordinates.x,
        blocks[block].coordinates.y,
        blocks[block].lineOnly
          ? (CONFIG.objectWidth / 2) * (options.gap + 1)
          : CONFIG.objectWidth / 2,
        blocks[block].lineOnly
          ? blocks[block].connectorThickness
          : CONFIG.objectHeight
      );
      context.fillStyle = '#ffffff';
      if (options.whiteGap && block === 'left') {
        context.fillRect(
          blocks[block].coordinates.x + CONFIG.objectWidth / 2,
          blocks[block].coordinates.y - 1,
          CONFIG.objectWidth / 2 * options.gap,
          CONFIG.objectHeight - 1
        )
      }
    }
    context.fillStyle = originalFillStyle;
  };

  const drawFullBlock = (context, coordinates, color) => {};

  const runCoordinateDistribution = (reps, context) => {
    coordinatesList = {};
    const originalFillStyle = context.fillStyle;
    for (let i = 0; i < reps; i++) {
      for (const sector of [1, 2, 3, 4]) {
        const angle = autoConfigRandomAngle(sector, 0, Math.PI / 2);
        const coordinates = generateCoordinatesFromAngle(angle, sector);
        context.fillStyle = "red";
        context.fillRect(coordinates.x, coordinates.y, 1, 1);
      }
    }
    context.fillStyle = originalFillStyle;
  };

  const showGrid = () => {};

  const showMargins = (context) => {
    const originalStrokeStyle = context.strokeStyle;
    context.strokeStyle = "red";
    // inner margins
    context.strokeRect(
      CONFIG.imageCenter.x - CONFIG.centralMargins,
      0,
      CONFIG.centralMargins * 2,
      context.canvas.height
    );
    context.strokeRect(
      0,
      CONFIG.imageCenter.y - CONFIG.centralMargins,
      context.canvas.width,
      CONFIG.centralMargins * 2
    );
    // outer margins
    context.strokeRect(
      CONFIG.outerMargins,
      CONFIG.outerMargins,
      context.canvas.width - CONFIG.outerMargins * 2,
      context.canvas.height - CONFIG.outerMargins * 2
    );
    context.strokeStyle = originalStrokeStyle;
  };

  const pickChangeLocation = (blocks) => {
    const randomIndex = Math.floor(Math.random() * blocks.length);
    return blocks[randomIndex];
  };

  const changeLocationManipulation = (changeLocation, mode, customConfig) => {
    if (mode === "flip") {
      changeLocation.colors = [
        changeLocation.colors[1],
        changeLocation.colors[0],
      ];
    } else if (mode === "change") {
      let color1 = changeLocation.colors[0];
      let color2 = changeLocation.colors[1];

      while (
        color1 === changeLocation.colors[0] ||
        color1 === changeLocation.colors[1] ||
        color2 === changeLocation.colors[0] ||
        color2 === changeLocation.colors[1]
      ) {
        const colorOptions = [...CONFIG.colors];
        color1 = sampleWithReplacement(colorOptions);
        color2 = sampleWithReplacement(colorOptions);
      }

      changeLocation.colors = [color1, color2];
    }
    return changeLocation;
  };

  const inverseManipulation = (targetBlock, mode, blocks) => {
    for (const block of blocks) {
      if (
        block.coordinates.x !== targetBlock.coordinates.x ||
        block.coordinates.y !== targetBlock.coordinates.y
      ) {
        changeLocationManipulation(block, mode, null);
      }
    }
    return targetBlock;
  };

  const manipulateAllBlocks = (blocks, mode) => {
    for (const block of blocks) {
      changeLocationManipulation(block, mode, null);
    }
  };

  const highlightChange = (changeLocation, context) => {
    const coordinates = changeLocation.coordinates;
    const boxSize = 10;
    const originalStrokeStyle = context.strokeStyle;
    const originalLineWidth = context.lineWidth;
    context.strokeStyle = "red";
    context.lineWidth = 10;

    context.strokeRect(
      coordinates.x - boxSize - CONFIG.objectWidth / 2,
      coordinates.y - boxSize - CONFIG.objectHeight / 2,
      CONFIG.objectWidth + boxSize * 2,
      CONFIG.objectHeight + boxSize * 2
    );
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
    sampleWithReplacement,
    pickChangeLocation,
    changeLocationManipulation,
    inverseManipulation,
    highlightChange,
    manipulateAllBlocks,
  };
};
