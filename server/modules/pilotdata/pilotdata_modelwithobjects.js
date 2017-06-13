var mongoose = require('mongoose')

var __name__Schema = mongoose.Schema({

user_id: {
  type: mongoose.Schema.Types.ObjectId,
  unique: true
},

crewcode: String,

certificates: {
  certificate : {
    type: String,
    id: String,
    expiration: Date,
    endorsements: {
      endorsement: String
    }
  }
},

typeratings: {
  typerating: {
  	type: String,
  	limitations: {
  		limitation: String
  	}
  }
},

logbook: { 
 type:Array, 
 default:[]
}

})

module.exports = __name__Schema