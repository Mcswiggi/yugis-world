import mongoose from 'mongoose'
const { Schema } = mongoose

export {
  Profile
}


const profileSchema = new Schema({
  name: String,
 
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)