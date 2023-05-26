import { useState } from "react";
import "../style/gamebox.scss"
import Settings from "./settings";
import GuessResult from "./guessResult.js";

export default function GameBox()
{
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [settingsBtnHidden, setSettingsBtnHidden] = useState(false);
    const [wordLength, setWordLength] = useState(5);
    const [uniqueWord, setUniqueWord] = useState(true);
    const [inputGuess, setInputGuess] = useState('');
    const [gameID, setGameID] = useState('');
    const [guesses, setGuesses] = useState();


    function handleUnique(changeUnique)
    {
        setUniqueWord(changeUnique)
    };

    function handleWordLength(changeWordLength) 
    {
        setWordLength(changeWordLength);
        setInputGuess('')
    }

    async function sendGuess()
    {
        const res = await fetch('http://localhost:5080/guess', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, inputGuess }),
        })
        const data = await res.json();
    }

    async function newGame()
    {
        const res = await fetch('http://localhost:5080/newgame', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ wordLength, uniqueWord, inputGuess }),
        })
        const data = await res.json();

        setGameID(data.gameId);
        setGuesses(data.guessList);

    }

    return (
        <>
            <Settings
                hidden={settingsHidden}
                wordLength={wordLength}
                handleWordLength={handleWordLength}
                uniqueWord={uniqueWord}
                handleUnique={handleUnique}
            />

            <section className="game-box">
                <div className="settings-box">

                    <button
                        className="settings-btn"
                        onClick={() => setSettingsHidden(!settingsHidden)}
                        disabled={settingsBtnHidden}
                    >⚙️
                    </button>

                </div>

                <div className="game">

                    <div className="guessInput">

                        <form action="submit" onSubmit={(ev) =>
                        {
                            ev.preventDefault();
                            setSettingsBtnHidden(true);
                            setSettingsHidden(true);
                            setInputGuess('');

                            if (!gameID)
                                newGame();
                            else
                                sendGuess();
                        }}>
                            <input
                                type="text"
                                placeholder="SKRIV IN DIN GISSNING"
                                value={inputGuess}
                                onChange={(ev) => setInputGuess(ev.target.value.toUpperCase())}
                                minLength={wordLength}
                                maxLength={wordLength}
                                pattern="[a-öA-Ö]+"
                                required
                            />
                        </form>
                    </div>

                    <GuessResult guesslist={guesses} />

                </div>
            </section >
        </>
    );

}