import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const port = 3000;
const app = express();
const API_KEY = "8e16d019711cfa5e7d07bedad91f9667";
const API_Token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTE2ZDAxOTcxMWNmYTVlN2QwN2JlZGFkOTFmOTY2NyIsIm5iZiI6MTcyMjAzMzM1MS40MDA4NDIsInN1YiI6IjY0NTRmMmVhYzA0NDI5MDE4NTcyNjE3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tTKKLJ7jQwdgfD3mMcUWI3MCg3H-d5bOSt5XpkiQ7Ig';
const config = {
    headers: { Authorization: `Bearer ${API_Token}` },
  };
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTE2ZDAxOTcxMWNmYTVlN2QwN2JlZGFkOTFmOTY2NyIsIm5iZiI6MTcyMjAzMzM1MS40MDA4NDIsInN1YiI6IjY0NTRmMmVhYzA0NDI5MDE4NTcyNjE3NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tTKKLJ7jQwdgfD3mMcUWI3MCg3H-d5bOSt5XpkiQ7Ig'
    }
  };


  
const popular_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const discover_url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
const upcoming_url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';



async function get_popular(){
    const response = await axios.get(popular_url, config);
    const result = response.data.results;

       return result;
}

async function get_discover(){
    const response = await axios.get(discover_url, config);
    const result = response.data.results;
 
    return result;
}

async function get_upcoming(){
    const response = await axios.get(upcoming_url, config);
    const result = response.data.results;
   
    return result;
}


app.get("/", async(req, res)=>{
    try{
        let populardata = await get_popular();
        let discoverdata = await get_discover();
        let upcomingdata = await get_upcoming();

        //console.log(populardata);

        res.render("home-page.ejs", 
            {popular_titles:populardata, 
            popular_images:populardata, 
            discover_images: discoverdata, 
            discover_titles: discoverdata, 
            upcoming_titles: upcomingdata, 
            upcoming_images: upcomingdata
        
        })
    }
    catch(error){
        console.log(error.message)
    }
   
})

app.get("/:title", async (req, res)=>{
    console.log(req.params.title)

})



app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})