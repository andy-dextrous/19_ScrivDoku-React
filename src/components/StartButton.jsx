import React, { useContext } from "react"
import { chosenNumbersContext } from "./../App"

const StartButton = (props) => {
	const { omittedSquares, handleClick } = props
	const { chosenNumbers } = useContext(chosenNumbersContext)

	return (
		<button
			className="button"
			id="start-game"
			style={
				chosenNumbers.length === omittedSquares.length
					? { backgroundColor: "green" }
					: {}
			}
			onClick={handleClick}>
			{chosenNumbers.length === omittedSquares.length
				? "Check Answers!"
				: "New Game"}
		</button>
	)
}

export default StartButton
