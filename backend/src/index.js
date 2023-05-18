import express from "express";
import wordList from "../js/wordList.js";

const app = express();

/* 
    GET för statisk sida

    Get Behöver fråga om ord som matchar kriteriana
        längd
        unika bokstäver
        svara med ordet och start tid

    GET om en array matchar ordet
        arrayen med bokstäver
        ordet
    
    POST highscore
        ordet,
        array med gissningarna,
        om unika,
        tid för start
        tid för slut
        räkna ut poäng
    

*/

app.use('/word', (req, res) =>
{
    console.log(req.body);
    res.status(200).json(
        {
            data: [],
        });
})

app.listen(5080);

/* import mongoose, { connect } from "mongoose";

const Room = mongoose.model("Room", 
{
    size: Number,
    inhabitant: 
    {
        name: String,
        age: Number,
    },
});

async function run()
{
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/test');

    const room = new Room({
        size: 25,
        inhabitant: {
            name: "Tarzan",
            age: 123,
        }
    })

    await room.save();

    const rooms = await Room.find();
    console.log(rooms);

    conn.disconnect();
};

run(); */