export default function Settings({ hidden, wordLength, handleWordLength, uniqueWord, handleUnique })
{
    if (hidden)
        return null;

    return (
        <div className="settings">
            <h3 className="settings-header">Spel Alternativ</h3>

            <p>Ordets längd {wordLength}</p>

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

            <p>Endast unika bokstäver i ordet</p>

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