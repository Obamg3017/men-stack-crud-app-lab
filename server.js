import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import express from 'express';
import Player from './models/player.js';
import methodOverride from "method-override";
import morgan from "morgan";


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev")); 


mongoose.connect(process.env.MONGODB_URI);




//Routes
app.get('/', async (req, res)=>{
    res.render('index.ejs')
});

app.get('/players/new', (req, res)=>{
    res.render('players/new.ejs');
});

app.get('/players', async (req, res)=>{
    const allPlayers = await Player.find()
    res.render('players/index.ejs', { players: allPlayers})
});

app.post('/players', async (req, res)=>{
    if(req.body.isAllStar === "on"){
        req.body.isAllStar = true;
    }else{
        req.body.isAllStar = false;
    }
    await Player.create(req.body);
    res.redirect('/players')
})

app.get('/players/:playerId', async (req, res)=>{
    const foundPlayer = await Player.findById(req.params.playerId)
    res.render('players/show.ejs', { player: foundPlayer});
})

app.delete("/players/:playerId", async (req, res) => {
  await Player.findByIdAndDelete(req.params.playerId);
  res.redirect("/players");
});

app.get("/players/:playerId/edit", async (req, res) => {
  const foundPlayer = await Player.findById(req.params.playerId);
  res.render("players/edit.ejs", { player: foundPlayer });
});


app.put("/players/:playerId", async (req, res) => {
  if (req.body.isAllStar === "on") {
    req.body.isAllStar = true;
  } else {
    req.body.isAllStar = false;
  }
  
  await Player.findByIdAndUpdate(req.params.playerId, req.body);

  res.redirect(`/players/${req.params.playerId}`);
});






mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});



app.listen(3000, () => {
    console.log("Listening on port 3000");
})