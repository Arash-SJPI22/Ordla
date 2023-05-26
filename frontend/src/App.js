import "./style/App.scss";
import Header from "./components/header.js";
import GameBox from "./components/gameBox.js";

export default function App()
{
	return (
		<div className="container">
			<div className="second-container">
				<Header />
				<h1 className="title">ORDLE</h1>
				<GameBox />
			</div>
		</div>
	);
}


