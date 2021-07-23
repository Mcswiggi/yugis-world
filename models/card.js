import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Card
}

const cardSchema = new Schema({
    name: String,
    attack: Number,
    defense: Number,
    effect: String,
    type: String,
    attribute: String,
    decks: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
    ygoprodeckId: {type:Number, unique: true}
  },{
    timestamps: true,
  });
  
  const Card = mongoose.model("Card", cardSchema);