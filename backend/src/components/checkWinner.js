export default function checkWinner(guess)
{
    let wins = 0;

    for (let i = 0; i < guess.length; i++) 
    {
        if (guess[i].result == 'correct')
        {
            wins++;
        }
    }

    if (wins == guess.length)
        return true;
    else
        return false;
}