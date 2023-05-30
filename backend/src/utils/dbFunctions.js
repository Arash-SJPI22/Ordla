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
    return { gameID: newG._id, gameGuesses: newG.guesses, endTime: newG.endTime };
};

export async function addguess(gameID, guessResult, winner)
{
    if (winner)
    {
        let endtime = isWinner(winner);

        const result = await HighScore.updateOne(
            { _id: gameID },
            {
                $push: { guesses: { word: guessResult } },
                $set: { endTime: endtime }
            },
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
    return result;
};

export async function getHighScore()
{
    return await HighScore.find({ $and: [{ endTime: { $ne: null } }, { playerName: { $ne: null } }] });
}

export async function cleanDB()
{
    const result = await HighScore.deleteMany({
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
    })

    if (result.deletedCount > 0)
        console.log("DB cleaning result: ", result)
}