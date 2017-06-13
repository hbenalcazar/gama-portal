var mongoose = require('mongoose')
<<<<<<< HEAD

var schedulerSchema = mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  }
})

module.exports = schedulerSchema
=======
var __name__Schema = mongoose.Schema({
field1:{ 
 type:String, 
 default:"field1"
},
field2:{ 
 type:Number, 
 default:0
} 
})
module.exports = __name__Schema
>>>>>>> training
