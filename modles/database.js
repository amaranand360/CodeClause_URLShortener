import mongoose from "mongoose";
import shortId from "shortid";

// process.env.MONGO_URI
// mongoose
// .connect(`${process.env.MONGO_URL}`,{
//     dbName : "",
// })
// .then((c)=> console.log(`Database Connected with ${c.connection.host}`))
// .catch((error)=> console.log(error))

export const connectDB = () => {
    mongoose
      .connect(process.env.MONGO_URL, {
        dbName: "Urlshortner",
      })
      .then((c) => console.log(`Database Connected with ${c.connection.host}`))
      .catch((e) => console.log(e));
  };
  


//database modles
const Schema = new mongoose.Schema({
    fullurl : {
        type: String,
        required: true,
    },
    shorturl: {
        type: String,
        required: true,
        default:shortId.generate
    },
        
});

export  const ShortUrl = mongoose.model("ShortUrl",Schema);