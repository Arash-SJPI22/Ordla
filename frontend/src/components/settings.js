import { useState } from "react";
import "../style/settings.scss"

export default function Settings({ hidden, wordLength, handleWordLength, uniqueWord, handleUnique })
{
    const [uniqueBoxDisabled, setUniqueBoxDisabled] = useState(false);

    if (hidden)
        return null;

    return (
        <div className="settings">
            <h3>ALTERNATIV</h3>

            <label htmlFor="wordLength" >ORD LÄNGD: <span className="word-length">{wordLength}</span></label>

            <input
                type="range"
                id="wordLength"
                min="3"
                max="27"
                value={wordLength}
                onChange={(rangeEv) =>
                {
                    handleWordLength(rangeEv.target.value);
                    if(rangeEv.target.value > 15) {
                        handleUnique(false);
                        setUniqueBoxDisabled(true);
                    } else {
                        setUniqueBoxDisabled(false);
                    }
                }}
            />

            <label htmlFor="checkBoxUniqueWord">ENDAST UNIKA BOKSTÄVER I ORDET</label>
            <input
                type="checkbox"
                id="checkBoxUniqueWord"
                value={uniqueWord}
                onChange={() =>
                {
                    handleUnique(!uniqueWord);
                }}
                checked={uniqueWord}
                disabled={uniqueBoxDisabled}
            />

        </div>
    );
}