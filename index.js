const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName = 'C:\Users\anayk\Downloads\landscape-1466459095-american-landmarks-mount-rushmore.jpg';

// Performs landmark detection on the local file
const [result] = await client.landmarkDetection(fileName);
const landmarks = result.landmarkAnnotations;
console.log('Landmarks:');
landmarks.forEach(landmark => console.log(landmark));