import '../style/guessresult.scss'

export default function GuessList({ guesses }) 
{
    console.log(guesses);
    return (
        <ul className="guessResult-letters">
            {guesses.word.map((word, index) =>
            {
                return (
                    <li className={word.result} key={index}>
                        {word.letter}
                    </li>
                );
            })}
        </ul>
    );
}