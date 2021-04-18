const { setupCanvasContext, drawFixationCross, convertMarginToAngle, generateRandomAngle, generateCoordinatesFromAngle } = painter();

CONFIG = {
  // ALL UNITS IN PIXELS UNLESS OTHERWISE STATED
  imageBackground: 'black',
  imageWidth: 1280,
  imageHeight: 1024,
  outerMargins: 20,
  centralMargins: 50,
  radial: {
    radius: 300
  },
  fixationCross: {
    show: true,
    color: '#ffffff',
    thickness: 10,
    length: 80,
  }
};
CONFIG.imageCenter = {
  x: CONFIG.imageWidth / 2,
  y: CONFIG.imageHeight / 2
}

// original canvas setup
const [ c1, c1Canvas ] = setupCanvasContext('original');

if (CONFIG.fixationCross.show) {
  drawFixationCross(c1, 0, 0);
}


for (let i = 0; i <= 100; i++) {
  const angle = generateRandomAngle(
    0 + convertMarginToAngle(CONFIG.centralMargins),
    Math.PI/2 - convertMarginToAngle(CONFIG.centralMargins)
  );
  
  for (const sector of [1, 2, 3, 4]) {
    const coordinates = generateCoordinatesFromAngle(angle, sector);
    c1.fillStyle = "#ff3939";
    c1.fillRect(coordinates.x, coordinates.y, 1, 1)
  }


}
