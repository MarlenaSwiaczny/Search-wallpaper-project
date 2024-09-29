import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
    let q = req.body["word"];
    
    try {
        const result = await axios.get(`https://wallhaven.cc/api/v1/search?q=${q}`);
        
        const myData = result.data.data;

        let headers = {
            "searches": [],
        }
        myData.forEach(item => {
            headers.searches.push(item.path);
        })
        res.render("index.ejs", headers);

    } catch (error) {
        console.log(error);
        console.log("czyli błąd...");
    }
});



app.listen(3000, () => {
    console.log(`Server started on port ${port}`)
});