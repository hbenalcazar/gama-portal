var mongoose = require('mongoose')
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