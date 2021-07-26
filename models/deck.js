import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Deck
}

const deckSchema = new Schema({
    name: String,
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    owner: {type: Schema.Types.ObjectId, ref: "Profile"}
  },{
    timestamps: true,
  });
  
  const Deck = mongoose.model("Deck", deckSchema);