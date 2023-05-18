import { useState } from "react";
import "../style/gamebox.scss"
import Settings from "./settings";

export default function GameBox()
{
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [wordLength, setWordLength] = useState(5);
    const [uniqueWord, setUniqueWord] = useState(false);
    const [inputGuess, setInputGuess] = useState('');

    function handleUnique(changeUnique)
    {
        setUniqueWord(changeUnique)
    };

    function handleWordLength(changeWordLength) 
    {
        setWordLength(changeWordLength);
    }

    console.log(`wordlenght: ${wordLength} - uniqueWord: ${uniqueWord}`)

    return (
        <section className="game-box">
            <button
                className="settings-btn"
                onClick={() => setSettingsHidden(!settingsHidden)}>⚙️
            </button>
            <Settings
                hidden={settingsHidden}
                wordLength={wordLength}
                handleWordLength={handleWordLength}
                uniqueWord={uniqueWord}
                handleUnique={handleUnique}
            />
            <div className="game">
                <div className="guessInput">
                    <form action="submit" onSubmit={async (ev) =>
                    {
                        ev.preventDefault();
                        console.log(`wordLength: ${wordLength}, unique: ${uniqueWord}, guess: ${inputGuess}`)
                        const res = await fetch('http://localhost:5080/word', {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ wordLength: wordLength, unique: uniqueWord })
                        })
                        const data = await res.json();
                        console.log(data)
                    }}>
                        <input type="text" placeholder="Skriv in din gissning" value={inputGuess} onChange={(ev) => setInputGuess(ev.target.value)} minLength={wordLength} maxLength={wordLength} pattern="[a-öA-Ö]+" required />
                    </form>

                </div>

            </div>
        </section>
    );
}