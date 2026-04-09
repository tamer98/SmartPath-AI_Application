import mongoose from "mongoose";


// Schema
const Schema = mongoose.Schema;
const DataPromptSchema = new Schema ({
  _id: { type: String, required: true }, 
  place: String,
  image: String,
  SCoordinatesX : Number,
  SCoordinatesY : Number,
  ECoordinatesX : Number,
  ECoordinatesY : Number
});



// Model
const DataPrompt = mongoose.model( 'DataPrompt', DataPromptSchema);
// Export the model using ES Module syntax
export default DataPrompt;