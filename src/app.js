const express = require("express");
const app = express();
require("./db/conn");

const Question = require("./models/question");

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
})

//CREATE NEW QUESTION
// app.post("/questions", (req, res) => {
//     console.log(req.body);
//     const ques=new Question(req.body);
//     ques.save().then(() => {
//         res.send(ques);
//     }).catch((e) => {
//         res.send(e);
//     })
// })

app.post("/questions", async (req, res) => {
    try{
        const ques = new Question(req.body);

        const token = await ques.generateAuthToken();
        console.log(token);

        const createQues=await ques.save();
        res.status(201).send(createQues);    
    }
    catch(e){
        res.status(400).send(e);
    }    
})


//READ ALL DATA
app.get("/questions", async(req, res) => {
    try{
        const quesData = await Question.find();
        res.send(quesData);
    }
    catch(e){
        res.send(e);
    }
})

//UPDATE THE DATA BY ID
app.patch("/questions/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const updateQues = await Question.findByIdAndUpdate(_id, req.body);
        res.send(updateQues);
    }
    catch(e){
        res.status(400).send(e);
    }
})

//DELETE THE DATA
app.delete("/questions/:id", async (req, res) => {
    try{
        const delQues = await Question.findByIdAndDelete(req.params.id);
        if(!req.params.id)return res.status(400).send();
        res.send(delQues);
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})