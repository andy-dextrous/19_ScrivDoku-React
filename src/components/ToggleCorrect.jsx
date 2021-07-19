import React from "react"
import { FaQuestion } from "react-icons/fa"

const ToggleCorrect = ({ toggleCorrect, isCorrectTurnedOn }) => {
	return (
		<button
			id="toggleCorrect"
			className="toggle-btn"
			style={isCorrectTurnedOn ? { backgroundColor: "#222222" } : {}}
			onClick={toggleCorrect}>
			<FaQuestion />
			{isCorrectTurnedOn && <span className="type-on">Check Answers</span>}
		</button>
	)
}

export default ToggleCorrect