import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Deck
}

const cardSchema = new Schema({
    name: String,
    cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    owner: {type:String}
  },{
    timestamps: true,
  });
  
  const Deck = mongoose.model("Deck", deckSchema);