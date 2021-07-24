import mongoose from 'mongoose'
const { Schema } = mongoose

export {
  Profile
}

const profileSchema = new Schema({
  name: String,
  decks: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],

}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)