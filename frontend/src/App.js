import { useState } from "react";

import "./App.css";

function App()
{
	const [optionHidden, setOptionHidden] = useState(true);
	const [wordLength, setWordLength] = useState(5);
	const [uniqueWord, setUniqueWord] = useState(false);
	const [inputGuess, setInputGuess] = useState('');
	const gameGrid = [[], [], [], [], [], []];

	//console.log(inputGuess);
	//console.log(gameGrid.length);

	return (
		<div className="container">
			<h1>Ordle</h1>
			<button
				onClick={() =>
				{
					setOptionHidden(!optionHidden);
				}}
			>
				Alternativ
			</button>

			<div
				className="options"
				hidden={optionHidden}
			>
				<h3>Spel Alternativ</h3>

				<p>Ordets längd {wordLength}</p>

				<input
					type="range"
					id="wordLength"
					min="3"
					max="27"
					value={wordLength}
					onChange={(rangeEv) =>
					{	
						setWordLength(rangeEv.target.value);
					}}
				/>

				<p>Endast unika bokstäver i ordet</p>

				<input
					type="checkbox"
					id="checkBoxUniqueWord"
					value={uniqueWord}
					onChange={() =>
					{
						setUniqueWord(!uniqueWord);
					}}
				/>
			</div>
			<div className="guessInput">
				<form action="submit" onSubmit={async (ev) => {
					ev.preventDefault();
					console.log(`wordLength: ${wordLength}, unique: ${uniqueWord}, guess: ${inputGuess}`)
					const res = await fetch ('http://localhost:5080/word', {
						method: "post",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({wordLength: wordLength, unique: uniqueWord})
					})
					const data = await res.json();
					console.log(data)
				}}>
					<input type="text" placeholder="Skriv in din gissning" minLength={wordLength} maxLength={wordLength}/>
				</form>

			</div>

			<div className="gameArea">
				{(() =>
				{
					for (let i = 0; i < gameGrid.length; i++)
					{
						gameGrid[i].push(
							<div>
								<h1>i</h1>
							</div>
						);
					}
					//console.log(gameGrid);
					//return gameGrid;
				})()}
			</div>
		</div>
	);
}

export default App;
