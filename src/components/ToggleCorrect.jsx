import React from "react";
import { FaQuestion } from "react-icons/fa";

const ToggleCorrect = ({ toggleCorrect, isCorrectTurnedOn }) => {
	return (
		<button
			id="toggleCorrect"
			style={isCorrectTurnedOn ? { backgroundColor: "#222222" } : {}}
			onClick={toggleCorrect}>
			<FaQuestion />
		</button>
	);
};

export default ToggleCorrect;