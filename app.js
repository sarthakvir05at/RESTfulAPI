const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const ejs= require('ejs');
const express= require('express');

const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema= new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String 
    }
});

const Article= mongoose.model("Article", articleSchema);

app.get("/article", (req,res) => {
    Article.find({}, (err,foundArticle) => {
        if(!err)
        res.send(foundArticle);
        else
        res.send(err);
    })
})

app.post("/article", (req,res) => {
    const title= req.body.title;
    const content= req.body.content;

    const newArticle= new Article({
        title,
        content
    });
    newArticle.save((err, doc) => {
        if(!err)
        res.send("Data Saved Successfully");
        else
        res.send(err);
    });
});

app.delete("/article", (req,res) => {
    Article.deleteMany({}, (err) => {
        if(!err)
        res.send("Successfully Deleted All Articles");
        else
        res.send(err);
    })
})

app.listen(3000, () => {
    console.log('Server is up and ready');
})