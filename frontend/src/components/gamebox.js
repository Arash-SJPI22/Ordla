import { useState } from "react";
import "../style/gamebox.scss"
import Settings from "./settings";

export default function GameBox()
{
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [settingsBtnHidden, setSettingsBtnHidden] = useState(false);
    const [wordLength, setWordLength] = useState(5);
    const [uniqueWord, setUniqueWord] = useState(true);
    const [inputGuess, setInputGuess] = useState('');
    const [answer, setAnswer] = useState('');
    const [guesses, setGuesses] = useState([]);

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
        const res = await fetch('http://localhost:5080/word', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ wordLength, uniqueWord }),
        })
        const data = await res.json();
        console.log(data.data)
    }

    //console.log(`wordlenght: ${wordLength} - uniqueWord: ${uniqueWord}`)

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
                        <form action="submit" onSubmit={(ev) =>
                        {
                            ev.preventDefault();
                            setSettingsBtnHidden(true);

                            sendGuess();
                        }}>
                            <input type="text" placeholder="SKRIV IN DIN GISSNING" value={inputGuess} onChange={(ev) => setInputGuess(ev.target.value.toUpperCase())} minLength={wordLength} maxLength={wordLength} pattern="[a-öA-Ö]+" required />
                        </form>
                    </div>

                    <div className="guessResult">
                        <ul className="guessResult-list">
                            <ul>
                                <li>K</li>
                                <li>A</li>
                                <li>M</li>
                                <li>E</li>
                                <li>L</li>
                            </ul>
                            <ul>
                                <li>G</li>
                                <li>E</li>
                                <li>T</li>
                                <li>E</li>
                                <li>R</li>
                            </ul>
                            <ul>
                                <li>G</li>
                                <li>E</li>
                                <li>T</li>
                                <li>E</li>
                                <li>R</li>
                            </ul>
                            <ul>
                                <li>G</li>
                                <li>E</li>
                                <li>T</li>
                                <li>E</li>
                                <li>R</li>
                            </ul>
                            <ul>
                                <li>G</li>
                                <li>E</li>
                                <li>T</li>
                                <li>E</li>
                                <li>R</li>
                            </ul>
                        </ul>
                    </div>
                </div>
            </section >
        </>
    );

}