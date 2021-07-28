import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Card
}

const cardSchema = new Schema({
    name: String,
    attack: Number,
    defense: Number,
    archetype: String,
    description: String,
    type: String,
    ygoId: Number,
    attribute: String,
    imageUrl: String,
    addedToDeck: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
  },{
    timestamps: true,
  });
  
  const Card = mongoose.model("Card", cardSchema);