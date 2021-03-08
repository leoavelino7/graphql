import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  actice: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model('User', Schema)