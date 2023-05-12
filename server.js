import express from "express";
import path from 'path';
const app = express();
import { ShortUrl } from "./modles/database.js";
import { config } from "dotenv";
import { connectDB } from "./modles/database.js";

config({
    path: "./data/config.env",
  });

connectDB();

//static file serving.
app.use(express.static(path.join(path.resolve(),'public')));
app.set("view engine","ejs");
app.use(express.urlencoded({extended :false}))

 
app.get("/", async(req, res) => {

    const newUrl = await ShortUrl.find();
    res.render('index',{newUrl:newUrl});
    
  });



app.post("/shorturls", async (req, res) => {
    await ShortUrl.create({ fullurl: req.body.orignalurl });
    // console.log(newUrl.fullurl);
    // console.log(newUrl.shorturl);
    res.redirect('/');   

});


app.get('/:shortUrl',async(req,res)=>{
    const newshorturl = await ShortUrl.findOne({shorturl: req.params.shortUrl})
    if(newshorturl == null) return res.sendStatus(404)
    // newshorturl.save();

    res.redirect(newshorturl.fullurl);
});


app.listen(process.env.PORT ,() => {
console.log(`Server is working on port:${process.env.PORT}`)
});

