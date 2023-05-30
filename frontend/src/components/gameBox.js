import { useState } from "react";
import "../style/gamebox.scss"
import Settings from "./settings";
import GuessResult from "./guessResult.js";
import Modal from "./modal.js";

export default function GameBox()
{
    const [modalHidden, setModalHidden] = useState(true);
    const [modalInfo, setModalInfo] = useState({});
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [settingsBtnHidden, setSettingsBtnHidden] = useState(false);
    const [wordLength, setWordLength] = useState(5);
    const [uniqueWord, setUniqueWord] = useState(false);
    const [inputGuess, setInputGuess] = useState('');
    const [gameID, setGameID] = useState('');
    const [guesses, setGuesses] = useState();


    function onClose(hiden)
    {
        setModalHidden(!modalHidden)
    }

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

        if (data.data)
        {
            setGuesses(data.guessList);

            if (data.endTime) 
            {
                setModalInfo({
                    title: "Vinnare!",
                    msg: "Du hittade rätt ord!",
                    winner: true,
                })
                setModalHidden(false);
            }
        }
        else 
        {
            if (data.guessList)
                setGuesses(data.guessList);

            setModalInfo({ title: data.title, msg: data.error })
            setModalHidden(false);
        }
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

        if (data.endTime) 
        {
            setModalInfo({
                title: "Vinnare!",
                msg: "Du hittade rätt ord!",
                winner: true,
            })
            setModalHidden(false);
        }
    }

    async function sendHighscore(playerName)
    {
        const res = await fetch('http://localhost:5080/highscore', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameID, playerName }),
        });

        const data = await res.json();

        if (data.data) 
        {
            setModalInfo({
                title: "Highscore!",
                msg: "Ditt namn är förevigat bland de bästa!",
            });
            setModalHidden(false);
        }
        else 
        {
            setModalInfo({ title: data.title, msg: data.error })
            setModalHidden(false);
        }
    }

    return (
        <>
            <Modal
                hidden={modalHidden}
                handleModal={onClose}
                title={modalInfo.title}
                msg={modalInfo.msg}
                winner={modalInfo.winner}
                handleHighscore={sendHighscore}
            />
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
                        className="newgame-btn"
                        onClick={() =>
                        {
                            setSettingsBtnHidden(false);
                            setGameID('');
                            setGuesses('');
                            setInputGuess('');
                        }}
                    >Nytt Spel
                    </button>
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
                            if (inputGuess.length == wordLength)
                            {
                                setInputGuess('');
                                if (!gameID)
                                {
                                    setSettingsBtnHidden(true);
                                    setSettingsHidden(true);
                                    newGame();
                                }

                                else
                                    sendGuess();
                            }
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