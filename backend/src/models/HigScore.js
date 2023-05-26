import mongoose from "mongoose";

const subSchemaLetter = mongoose.Schema(
    {
        letter: String,
        result: String,
    }, { _id: false });

const suBSchemaWord = mongoose.Schema(
    {
        word: [subSchemaLetter]
    }, { _id: false });

export const HighScoreSchema = mongoose.Schema(
    {
        answer: String,
        guesses: [suBSchemaWord],
        endTime: Date,
        uniqueLetters: Boolean,
        playerName: String,

    });