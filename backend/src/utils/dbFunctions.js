import { HighScoreSchema } from "../models/HighScore.js";
import mongoose from "mongoose";

const HighScore = mongoose.model("HighScore", HighScoreSchema);

function isWinner(winner) 
{
    if (winner)
        return new Date();
    else
        return null;
}

export async function newgame(answer, guessResult, uniqueWord, winner)
{
    let endtime = isWinner(winner)

    const newG = await HighScore.create(
        {
            answer: answer,
            guesses: [{ word: guessResult }],
            endTime: endtime,
            uniqueLetters: uniqueWord,
            playerName: null,
        })
    return { gameID: newG._id, gameGuesses: newG.guesses };
};

export async function addguess(gameID, guessResult, winner)
{
    if (winner)
    {
        let endtime = isWinner(winner);

        const result = await HighScore.updateMany(
            { _id: gameID },
            { $push: { guesses: { word: guessResult } } },
            { endTime: endtime }
        );

        return result;
    }
    else
    {
        const result = await HighScore.updateOne(
            { _id: gameID },
            { $push: { guesses: { word: guessResult } } },
        );

        return result;
    }
};

export async function addWinner(gameID, playerName) 
{
    const result = await HighScore.updateOne(
        { _id: gameID },
        { $set: { playerName: playerName } },
    )
};

export async function getHighScore()
{
    return await HighScore.find({ endTime: { $ne: null } });
}

export async function cleanDB()
{
    const conn = mongoose.connection;
    conn.collection('highscores').deleteMany({
        "$and":
            [
                { "endTime": null },
                {
                    "$expr":
                    {
                        "$lte":
                            [
                                { "$toDate": "$_id" },
                                new Date(Date.now() - 1000 * (60 * 120))
                            ]
                    }
                }
            ]
    });
}