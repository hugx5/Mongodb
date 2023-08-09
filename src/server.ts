import express  from "express"; 
import mongoose from "mongoose";
import routes from "./routes";


const app =  express();

mongoose.connect("mongodb://localhost:27017/fistapi");


app.use(express.json());

app.use(routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


