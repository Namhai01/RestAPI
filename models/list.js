
const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  DoB:{
    type: Date,
    required: true,
  },
  diemtb: {
    type: String,
    required: true
  },
  CreateDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('people', listSchema)