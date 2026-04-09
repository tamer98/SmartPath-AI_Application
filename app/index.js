import OpenAI from "openai";
import dotenv from 'dotenv';
import express from "express";
import { dirname } from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import opencage from 'opencage-api-client';
import DataPrompt from "./db.js";

console.log("File started running");

// change the path with dir *****
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var uResponse = "";
dotenv.config();


// Serve static files from the 'public' directory **** app.use(express.static("public"));
app.use(express.static(__dirname + '/'));
// information coming in , we can also wrote express.urlencoded beacuse it's already included in express 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// api key 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API  // api key 
});

 
//connect to db
console.log("Connecting to:", process.env.DATABASE_URI);
mongoose.connect(process.env.DATABASE_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


mongoose.connection.on("connected", () => {
  console.error("mongoose connected !");

  try {
    mongoose.connection.collection("dataprompts").deleteMany({});
    console.log("All data deleted");
  } catch (err) {
    console.error("Error deleting data:", err);
  }

});


app.get("/", (req, res) => {
 res.sendFile(__dirname + "index.html");
});


app.post("/submit", async (req, res) => {

 uResponse = req.body["userInput"];
 var location = uResponse.split(',');
 console.log("county ---" + location[0]);
 console.log("type ---" + location[1]);

  const userPrompt = "please give one possible Starting point and Ending point locations for " + location[1] + " route in " + location[0] + 
  " area and make sure it contains Main Street,Town and Country in this format exactly: 'Street,Town,Country' , for example 'quantom,Berlin,Germany|the kings,Berlin,Germany' without any extras";

  //call the ai generation 3 times for each different route
  for (let i = 1; i < 4; i++) {
    var pLat = new Array(2);
    var pLng = new Array(2);

    try {
      const chatResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',//4
        messages: [{"role":"user","content": userPrompt}],
        max_tokens: 1000,
      });

      const ImageResponse = await openai.images.generate({
      model: 'dall-e-2',//dalle 3 have error when we ask for 2 or more images we can use dalle 2 it works 
      prompt: location[0],
      n:1,
      size:"512x512", // 256x256', '512x512', '1024x1024', '1024x1792', '1792x1024
      });
  
      //print chat res
      var route = chatResponse.choices[0].message.content;
      console.log("route before split -- : " + route);


      //print chat res after splited into routes
      var routes = chatResponse.choices[0].message.content.split('|');
      console.log("route 1 after split -- : " + routes[0]);
      console.log("route 2 after split -- : " + routes[1]);


      //print img res
      const imageUrl = ImageResponse.data[0].url;
      console.log(imageUrl);


      // note that the library takes care of URI encoding
      for (let j = 0; j < 2; j++) {
        try {
          const data = await opencage.geocode({ q: routes[j], key: process.env.GEO_API });
        
          if (data.status.code === 200 && data.results.length > 0) {
           const place = data.results[0];
           pLat[j] = place.geometry.lat;
           pLng[j] = place.geometry.lng;
           console.log(place.formatted);
           console.log(place.geometry.lat);
           console.log(place.geometry.lng);
           console.log(place.annotations.timezone.name);
          } else {
           console.log('Status', data.status.message);
           console.log('total_results', data.total_results);
          }
        } catch (error) {
         console.log('Error', error.message);
         if (error.status.code === 402) {
           console.log('hit free trial daily limit');
           console.log('become a customer: https://opencagedata.com/pricing');
          }
        }
      }

    
     // a document instance
     var newDataRes = new DataPrompt({
       _id: i,
       place: location[0],
       image: ImageResponse.data[0].url,
       SCoordinatesX : pLat[0],
       SCoordinatesY : pLng[0],
       ECoordinatesX : pLat[1],
       ECoordinatesY : pLng[1]
      });

     //save data into database
     saveDataInDb(newDataRes);

    } catch (error) {
     console.error("Failed to make request:", error.message);
    }
  }
 res.redirect("/");
});


app.get("/option1", async (req, res) => {
  var id = "1";
  const doc = await findDataInDb(id);
  // Log the entire doc object

  console.log("Document retrieved: ", doc);
  
  if (!doc) {
    return res.status(404).send('Document not found');
  }

  // Log the place and image URL
  console.log("Place Name: ", doc.place);
  console.log("Image URL: ", doc.image);
  
  const coordinates = {
    sC: [doc.SCoordinatesX, doc.SCoordinatesY], // Starting coordinates
    eC: [doc.ECoordinatesX, doc.ECoordinatesY]  // Ending coordinates
  };

  res.render("route1.ejs", { coordinates , img : doc.image , placeName : doc.place});
});


app.get("/option2", async (req, res) => {
  var id = "2";
  const doc = await findDataInDb(id);
  // Log the entire doc object
  
  console.log("Document retrieved: ", doc);
  
  if (!doc) {
    return res.status(404).send('Document not found');
  }

  // Log the place and image URL
  console.log("Place Name: ", doc.place);
  console.log("Image URL: ", doc.image);
  
  const coordinates = {
    sC: [doc.SCoordinatesX, doc.SCoordinatesY], // Starting coordinates
    eC: [doc.ECoordinatesX, doc.ECoordinatesY]  // Ending coordinates
  };

  res.render("route2.ejs", { coordinates , img : doc.image , placeName : doc.place});
});


app.get("/option3", async (req, res) => {
  var id = "3";
  const doc = await findDataInDb(id);
   // Log the entire doc object
  
   console.log("Document retrieved: ", doc);
  
   if (!doc) {
     return res.status(404).send('Document not found');
   }
 
   // Log the place and image URL
   console.log("Place Name: ", doc.place);
   console.log("Image URL: ", doc.image);
  const coordinates = {
    sC: [doc.SCoordinatesX, doc.SCoordinatesY], // Starting coordinates
    eC: [doc.ECoordinatesX, doc.ECoordinatesY]  // Ending coordinates
  };

  res.render("route3.ejs", { coordinates , img : doc.image , placeName : doc.place});
});


// save data in database
function saveDataInDb(data){

  data.save();
  console.log('Data saved successfully:', newDataRes);

}


//retrieve data from database using id of document
function findDataInDb(id){
  try {
    const doc = DataPrompt.findById(id);

    if (doc) {
      // console.log('Document found:', doc);
      return doc;

    } else {
      console.log('No document matches the provided ID.');
    }
  } catch (err) {
    console.error('Error finding document:', err);
  }
};


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});