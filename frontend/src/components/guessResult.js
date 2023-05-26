import '../style/guessresult.scss';
import GuessList from './guessList.js';

export default function GuessResult({ guesslist })
{
    if (!guesslist)
    {
        return (
            <>
            </>
        );
    } else
    {
        return (
            <div className="guessResult">
                <ul className="guessResult-list">
                    {guesslist.map(guess =>
                    {
                        return (
                            <GuessList guesses={guess} />
                        );
                    })}
                </ul>
            </div>

        );
    }
}