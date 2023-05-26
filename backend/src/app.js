import mongoose from "mongoose";
import express from "express";
import wordList from "./components/wordList.js";
import checkGuess from "./components/checkGuess.js";
import { HighScoreSchema } from "./models/HigScore.js";

const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ordla');


const app = express();
app.use(express.json());

app.post('/newgame', async (req, res) =>
{
    let wordLength = req.body.wordLength;
    let uniqueWord = req.body.uniqueWord;
    let playerGuess = req.body.inputGuess;

    //ev skicka tillbaka en random 5 bokstävigt ord om det är fel på inputen eller ord inte matchar kriterierna
    if (
        ((wordLength >= 3) && (wordLength <= 27))
        &&
        ((uniqueWord === true) || (uniqueWord === false))
        &&
        (playerGuess.length == wordLength)

    )
    {
        if (wordLength > 15)
            uniqueWord = false;

        const answer = wordList(wordLength, uniqueWord);
        const guessResult = checkGuess(playerGuess, answer)

        if (answer)
        {
            const HigScore = mongoose.model("HighScore", HighScoreSchema);

            const newgame = new HigScore(
                {
                    answer: answer,
                    guesses: [{ word: guessResult }],
                    endTime: null,
                    uniqueLetters: uniqueWord,
                    playerName: null,
                })

            const game = newgame._id;
            const gameGuesses = newgame.guesses;
            
            await newgame.save();

            res.status(200).json(
                {
                    gameId: game,
                    guessList: gameGuesses,
                });
        } else
        {

            res.status(400).json(
                {
                    data: "Bad criteria"
                });
        }
    } else
    {

        res.status(400).json(
            {
                data: "Faulty input",
            }
        );
    }

});

app.post('/guess', (req, res) =>
{

});

export default app;