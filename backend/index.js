const  CREDENTIALS = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "lenscape",
  "private_key_id": "6553d5c6659152b5765f784fc53bc9266cc11554",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCLN/n7FY+rLMvZ\nrH+/MrETELq/VlyG+YQAM88sDlhJcEoTUZdWFIsAhLa8FGQarJ0mmUykNsnaD6KZ\neWNBv7YvcolT8aXYtgM9/EZp7zy7d02LM7+urZuse0S5/kWc6BFbb/R8VLjAcxdg\nycBwRAIxlwrUlvdgSMteELpBOlGREjJYIN/V/6vFGER32sA6CNkRJ4REAWSKan/R\nq7NOCMxx+2KEH8aD0ucR8KJeEbQbUmtkwkpSfAHaXHBUfaPgofRJQf3XHgXHO+Uk\nZUE0eFFvwVZhqWxrMCimiuicC7XssfKDhlRJlXrMPljApb8dG2914oxcT88oGROX\nMA9Er50XAgMBAAECggEAAbsKYmAdXBIHIaeRCq/4tFtrz6SS+mgupdLae2BdOhMm\nWDS02nOKHWPMARGJohR+JgCdzr0SABv6RE9WZbPdX7RufBMoQEXoGqYuZsJ8IgC9\n7T8XgmpDvUSpyAb6VJrW+MdHYu9s30mr7fDTWVNyiDNUf35gp0wFsjgDWRovLjOj\nzJDgo8Lko4/XdZjuRmi7ORDRbAX90jejh/DAQqClVRd8HZGTrBGiZrvg9tPxKTx0\nAVVMyM5XKlss0vYCRmxZ5JD5YgPXvgusUghYIRBNPfAId9Hq21arInj3jZlN6HBb\nobhACUufJOyVFtnYzyb5Y/IV+VQu5xhoYIlwky/Q6QKBgQC9Ry8MyfxrpQjsqQu+\nZypRvTINY8daFv/y7VmESlV9MUsiOi+BCf2weE6kq4soKuflgKRLFdltSLHAjSG8\nDEIvajWo/LMI02Uh1nhc3XH6n0opNUuyS5SGjPOI2bZEag3ZDcWvAQtShAoyklE8\n/OMYPGdMYQR11seRNsXtdjMbjwKBgQC8S1X773t3nasNWNmRAXSfI3b9og0noYu2\nnVnk3zgsjYuQMteS1du1kWHdAUEwB+FO7jvXgYB+0WDYin0DOAUkQEEZwksh8m3S\nhG4Mpm80C/DMTVJIzt90lQWQOiFJXp2VS2Iy8RjE8O0fG/uRgD2Ol3GQYkhKe9gH\n3erJ+h3B+QKBgQCrn3/p+LwIXvxYmm8rlh+pPgPEYFTCO1iYzN3+NeiOO8QEpP2t\n44FEIdItPd5P7ZeXYa2W55jenquODGoqOHNKyuMc9wTfW863f+BjU+eleAmmk8yv\nPhjOZ7/qtn2uSvuDdBlrNWcuysr0T/eZdTP1JdAEUXPZ5YXPBfsx9ZshwQKBgBE8\nWCeSmVuurAyxuGCkoHc8uNSos8mP6QkTSDpCEJNLdZ4CeWcwekcZgrrHNZ9e6Unf\nVsz4RrnVEqdfrefQhe/2jb784QG/fjwJ8UTpKz65ZRZecYzGmv/B8FtuZsOfjI8w\n8lE1bo4Ae8QgPJvqADiANl4AERv4UCMQNkC8y2KJAoGAfJVBwmkEYhN/l+UjBe27\nEx4dd3Jlr0t1X2rsoR+kEE/0tLd/6EqhOXL0ENZ9b4M0jxOBMQLDLMuBFHcRuvGe\nucsneMVfZjeWb9Ce13iB7D4oABwNbU+nPgzWyfdGI+QNXaEIybok8ReW5nszpcQM\njdjq5UnNjKNkozs0pJcJKCE=\n-----END PRIVATE KEY-----\n",
  "client_email": "lenscape@lenscape.iam.gserviceaccount.com",
  "client_id": "100335420542535301164",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/lenscape%40lenscape.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}))


const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email
  }
}

const express = require("express");
const http = require("http")

const bodyParser = require("body-parser");

const app = express();

const hostName = "10.20.0.123"
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());

const server = http.createServer(app)

server.listen(PORT, hostName, () => {
  console.log(`Server running at ${hostName}:${PORT}`)
})

// Define your API routes here
app.get("/api/data", (req, res) => {
    console.log("Simulator connected");
    getLandmark().then(
      function(result){
        console.log("success")
        console.log(result)
        const data = {
          message: result
        }
        console.log(data)
        res.json(data)
      }
    ).catch(
      function(error){
        console.log("error")
        console.log(error)
        res.json(error)
      }
    )
});

app.post('/getImageLoc', (req, res) => {
    let imageData = req.body.imageData
    
    getLandmark(imageData).then(
      function(result){
        console.log(imageData)
        console.log("success")
        console.log(result)
        const data = {
          message: result
        }
        console.log(data)
        res.json(data)
      }
    ).catch(
      function(error){
        console.log("error")
        console.log(error)
        res.json(error)
      }
    )
})

async function getLandmark(imageURI) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient(CONFIG);
  
    // Performs landmark detection on the image file
    let result
    let landmarks
    let message

    try {
      [result] = await client.landmarkDetection(imageURI);
      landmarks = result.landmarkAnnotations;
      landmarks.forEach(landmark => {
        console.log(landmark.description + JSON.stringify(landmark.locations)),
        message = landmark.description});
    } catch(e){
      message = e
    }
  
    return message;
  }

const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { hostname } = require("os");

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyApE5ojWr89nZETTar3YQSoIBkjaI5YQy0");

async function searchLandmarks() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Give me 10 landmarks in North and South Dakota. Format it as JSON with descriptions and gps coordinates"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);

    return text;
  }
  
//   async function checkLandmarksInText() {
//     const landmarks = await getLandmark();
//     const text = await searchLandmarks();
    
//     let found_location = false;
//     let location_name;
//     landmarks.forEach(landmark => {
//         if (text.includes(landmark.description)) {
//             console.log(`${landmark.description} is included in the generated text.`);
//             found_location = true;
//             location_name = landmark.description;
//         } else {
//             console.log(`${landmark.description} is not included in the generated text.`);
//         }
//     });
//     if (found_location) {
//         console.log(`${location_name} is was validated.`)
//         return true;
//     }
//     else {
//         return false;
//     }
// }

// checkLandmarksInText();

  
 