import "./style/App.scss";
import Header from "./components/header.js";
import GameBox from "./components/gameBox.js";

export default function App()
{
	return (
		<>
			<h1 className="title">ORDLE</h1>
			<GameBox />
		</>
	);
}


