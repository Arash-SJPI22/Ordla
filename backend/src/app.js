import mongoose from "mongoose";
import express from "express";
import wordList from "./components/wordList.js";
import checkGuess from "./components/checkGuess.js";
import checkWinner from "./components/checkWinner.js";
import { HighScoreSchema } from "./models/HighScore.js";
import { newgame, addguess, cleanDB, addWinner, getHighScore } from "./utils/dbFunctions.js";

const conn = await mongoose.connect('mongodb://127.0.0.1:27017/ordla');

const HighScore = mongoose.model("HighScore", HighScoreSchema);

const app = express();
app.use(express.json());

app.post('/newgame', async (req, res) =>
{

    cleanDB();

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
        const winner = checkWinner(guessResult);

        if (answer)
        {
            const game = await newgame(answer, guessResult, uniqueWord, winner);

            res.status(200).json(
                {
                    gameId: game.gameID,
                    guessList: game.gameGuesses,
                    endTime: game.endTime,
                });
        } else
        {
            res.status(400).json(
                {
                    data: false,
                    title: "Error!",
                    error: "Inget ord hittades, felaktiga inställningar för ord!"
                });
        }
    } else
    {
        res.status(400).json(
            {
                data: false,
                title: "Fel!",
                error: "Felaktig ord inställningar eller ord längd!",
            }
        );
    }

});

app.post('/guess', async (req, res) =>
{
    cleanDB();

    const gameID = req.body.gameID;
    const playerGuess = req.body.inputGuess;

    let post = await HighScore.findById(gameID);

    if (!post)
    {
        res.status(410).json({
            data: false,
            title: "Fel!",
            error: "Fel spel ID eller så har din spel session gått ut!",
        });
    }
    else if (post.guesses.length === 5)
    {
        res.status(403).json({
            data: false,
            title: "Spel är över!",
            error: `Rätt ord var: ${post.answer}`
        })
    }
    else
    {
        const answer = post.answer;
        const wordLength = post.guesses[0].word.length;
        const endTime = post.endTime;

        if (playerGuess.length === wordLength && !endTime)
        {
            const guessResult = checkGuess(playerGuess, answer)
            const winner = checkWinner(guessResult);

            const result = await addguess(gameID, guessResult, winner)

            post = await HighScore.findById(gameID);

            if (result.acknowledged)
            {
                res.status(202).json({
                    data: true,
                    guessList: post.guesses,
                    endTime: post.endTime,
                })
            }
            else
            {
                res.status(406).json({
                    data: false,
                    title: "Error!",
                    error: "Fel vid databasen!"
                })
            }
        }
        else if (endTime) 
        {
            res.status(400).json({
                data: false,
                title: "Fel!",
                error: "Spelet är redan avslutat!"
            })
        }
        else
        {
            res.status(400).json({
                data: false,
                title: "Fel!",
                error: "Din gissning har fel längd!"
            })
        }
    }
});

app.post('/highscore', async (req, res) =>
{
    const gameID = req.body.gameID;
    const playerName = req.body.playerName;

    let post = await HighScore.findById(gameID);

    if (!post)
    {
        res.status(400).json({
            data: false,
            title: "Fel!",
            error: "Fel spel id, existerar inte!"
        })
    }
    else if (post && post.playerName) 
    {
        res.status(400).json({
            data: false,
            title: "Fel!",
            error: "Vinnaren har redan skrivit in sitt namn!"
        })
    }
    else 
    {
        const result = await addWinner(gameID, playerName);
        res.status(201).json({
            data: true,
        })
    }
});

export default app;