import express from "express";
import wordList from "./components/wordList.js";

const app = express();
app.use(express.json());

app.post('/word', (req, res) =>
{
    let wordLength = req.body.wordLength;
    let uniqueWord = req.body.uniqueWord;

    //ev skicka tillbaka en random 5 bokstävigt ord om det är fel på inputen eller ord inte matchar kriterierna
    if (
        ((wordLength >= 3) && (wordLength <= 27))
        &&
        ((uniqueWord === true) || (uniqueWord === false)))
    {
        if (wordLength > 15)
            uniqueWord = false;

        const word = wordList(wordLength, uniqueWord);

        if (word)
        {
            res.status(200).json(
                {
                    data: word,
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
})

export default app;