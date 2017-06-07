var mongoose = require('mongoose')
var __name__Schema = mongoose.Schema({
testField1:{ 
 type:String, 
 default:test_value1
},
testField2:{ 
 type:Number, 
 default:0
},
testField3:{ 
 type:Array, 
 default:""
} 
})
module.exports = __name__Schema