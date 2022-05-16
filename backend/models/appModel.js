const mongoose = require('mongoose')

const appSchema = mongoose.Schema({
  company: {
    type: String
  },
  position: {
    type: String
  },
  posting: {
    type: String
  },
  recruiter: {
    type: String
  },
  date: {
    type: String
  },
  stage: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('App', appSchema)