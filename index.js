const  CREDENTIALS = 'credentials.json';

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email
  }
}

async function getLandmark() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient(CONFIG);
  
    // Performs landmark detection on the image file
    const [result] = await client.landmarkDetection('IMG_6516.jpg');
    const landmarks = result.landmarkAnnotations;
    console.log('Landmarks:');
    landmarks.forEach(landmark => console.log(landmark.description));
  }
  getLandmark();

 