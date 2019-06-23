import express from "express";
import mongoose from "mongoose";
import { Weight } from "./Weight";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI;

if (SECRET === undefined || MONGO_URI === undefined) {
  throw new Error("Invalid environment");
}

const verySophisticatedAuthorizationMdl: express.Handler = (req, res, next) => {
  if (req.body.secret === SECRET || req.query.secret === SECRET) {
    next();
  } else res.sendStatus(403);
};

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(verySophisticatedAuthorizationMdl);

mongoose.connect(MONGO_URI, { useNewUrlParser: true });

app.get("/weights", async function(req, res) {
  try {
    const weights = await Weight.find({
      date: { $gt: new Date(2019, 0, 1) }
    }).sort("-date");
    res.json(weights);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

app.post("/weights", async function(req, res) {
  if (req.body.weight === undefined) {
    res.sendStatus(400)
    return
  }
  try {
    const newWeight = new Weight({
      date: new Date().toISOString(),
      weight: req.body.weight
    })
    await newWeight.save()
    res.json(newWeight);
  }
  catch(e) {
    console.error(e)
    e.sendStatus(500)
  }
});

app.listen(PORT, function() {
  console.log(`App listening on port ${PORT}!`);
});
