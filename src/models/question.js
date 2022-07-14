const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const quesSchema = new mongoose.Schema({
    ID:String,
    title:String,
    description: String,
    options : [{
        sequence: Number,
        option_title:String
    },{
        sequence: Number,
        option_title:String
    },{
        sequence: Number,
        option_title:String
    },{
        sequence: Number,
        option_title:String
    }],
    correctOption: Number,
})

//GENERATING TOKENS
quesSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, "unnatmittalqwertyuiopasdfghjklzxcvbnm");
        // this.tokens = this.tokens.concat({token:token})
        // await this.save();
        console.log(token);
        return token
    }
    catch(e){
        res.send(e);
        console.log(e);
    }
}

const Question = new mongoose.model('Question', quesSchema);
module.exports = Question;