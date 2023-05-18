import "../style/settings.scss"

export default function Settings({ hidden, wordLength, handleWordLength, uniqueWord, handleUnique })
{
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
            />

        </div>
    );
}