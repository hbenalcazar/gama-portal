var mongoose = require('mongoose')

var __name__Schema = mongoose.Schema({

user_id: {
  type: mongoose.Schema.Types.ObjectId,
  unique: true
},

crewcode: { 
 type:String, 
 default:null
},

certificates: {
  type: Array,
  default: [],
},

typeratings: {
  type: Array,
  default: []
},

logbook:{ 
 type:Array, 
 default:[]
}

})

module.exports = __name__Schema