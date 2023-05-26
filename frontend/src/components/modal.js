import '../style/modal.scss';
import { useState } from 'react';



export default function Modal({ hidden, handleModal, title, msg, winner = false, handleHighscore })
{
    const [playerName, setPlayerName] = useState('');
    if (hidden)
        return null;

    return (
        <>
            <div className="modalOverlay" onClick={handleModal} />
            <div className="modalContainer">
                <h2> {title} </h2>
                <p> {msg} </p>
                <form action="submit" onSubmit={() =>
                {
                    handleHighscore(playerName)
                    handleModal();
                }}>
                    <input
                        type="text"
                        placeholder='SKRIV IN DITT NAMN'
                        value={playerName}
                        onChange={(ev) => setPlayerName(ev.target.value.toUpperCase())}
                        maxLength={20}
                        required
                        hidden={!winner}
                    />
                    <button
                        hidden={!winner}
                    >Skicka</button>
                </form>
            </div>
        </>
    )
}