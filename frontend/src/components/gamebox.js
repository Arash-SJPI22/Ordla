import { useState } from "react";
import "../style/gamebox.scss"
import Settings from "./settings";

export default function GameBox()
{
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [settingsBtnHidden, setSettingsBtnHidden] = useState(false);
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
                        onClick={() => setSettingsHidden(!settingsHidden)} disabled={settingsBtnHidden}>⚙️
                    </button>
                    <p>Tid: <span className="time">00:00:00</span></p>
                    <p>Poäng: <span>0</span> </p>
                </div>

                <div className="game">
                    <div className="guessInput">
                        <form action="submit" onSubmit={async (ev) =>
                        {
                            ev.preventDefault();
                            setSettingsBtnHidden(true);

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
                            <input type="text" placeholder="SKRIV IN DIN GISSNING" value={inputGuess} onChange={(ev) => setInputGuess(ev.target.value.toUpperCase())} minLength={wordLength} maxLength={wordLength} pattern="[a-öA-Ö]+" required />
                        </form>

                    </div>

                </div>
            </section>
        </>
    );

}