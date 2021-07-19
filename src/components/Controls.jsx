import React, { useState, useContext } from "react"
import WinControls from "./WinControls"
import PlayControls from "./PlayControls"
import {
	takeNotesTurnedOnContext,
	isCorrectContext,
	boardContext,
	submissionContext,
	chosenNumbersContext,
} from "../App"

// Control Context for children
export const ControlContext = React.createContext()

const Controls = (props) => {
	//props
	const { startNewGame } = props

	//state
	const [isNewGameButtonClick, setIsNewGameButtonClick] = useState(false)
	const [isPlaced, setIsPlaced] = useState(false)
	const [showLeaders, setShowLeaders] = useState(false)
	const [isWinner, setIsWinner] = useState(false)
	const [finalTime, setFinalTime] = useState("00:00")
	// contexts
	const { takeNotesTurnedOn, setTakeNotesTurnedOn } = useContext(
		takeNotesTurnedOnContext
	)
	const { setSubmitting, setSubmitted } = useContext(submissionContext)
	const { isCorrectTurnedOn, setIsCorrectTurnedOn } =
		useContext(isCorrectContext)
	const { boardConfig, omittedSquares } = useContext(boardContext)
	const { chosenNumbers } = useContext(chosenNumbersContext)

	// New Game function with resets
	const start = () => {
		setShowLeaders(false)
		setSubmitting(false)
		setFinalTime("00:00")
		setIsPlaced(false)
		setSubmitted(false)
		startNewGame()
	}

	// New Game/Check Scores button click handler
	const handleClick = () => {
		chosenNumbers.length === omittedSquares.length
			? checkForWin()
			: setIsNewGameButtonClick(!isNewGameButtonClick)
	}

	// If all squares are filled with numbers, check to see if they are all correct
	const checkForWin = () => {
		const squaresFromDOM = document.querySelectorAll(".grid .square")
		const allAnswers = []
		squaresFromDOM.forEach((square) => {
			const inner = square.querySelector(".chosenNumber").innerHTML
			const number = parseInt(inner)
			allAnswers.push(number)
		})

		const winner = allAnswers.every((answer, index) => {
			return boardConfig[index] === answer
		})

		winner ? showWin() : showIncorrect()
	}

	// If every square is correct, freeze the timer and display success screen
	function showWin() {
		const timerDisplay = document.getElementById("timer").innerText.trim()
		setFinalTime(timerDisplay)
		setShowLeaders(true)
		setIsWinner(true)
	}

	function showIncorrect() {
		setIsCorrectTurnedOn(true)
		setTimeout(() => {
			setIsCorrectTurnedOn(false)
		}, 2000)
	}

	function toggleNotes() {
		setTakeNotesTurnedOn(!takeNotesTurnedOn)
	}

	function toggleCorrect() {
		setIsCorrectTurnedOn(!isCorrectTurnedOn)
	}

	function toggleLeaderBoard() {
		setShowLeaders(!showLeaders)
	}

	const controlProps = {
		finalTime,
		start,
		isPlaced,
		setIsPlaced,
		isWinner,
		setIsWinner,
		isNewGameButtonClick,
		setIsNewGameButtonClick,
	}

	return !isWinner ? (
		<ControlContext.Provider value={controlProps}>
			<PlayControls
				handleClick={handleClick}
				toggleNotes={toggleNotes}
				toggleCorrect={toggleCorrect}
				toggleLeaderBoard={toggleLeaderBoard}
				showLeaders={showLeaders}
			/>
		</ControlContext.Provider>
	) : (
		<ControlContext.Provider value={controlProps}>
			<WinControls />
		</ControlContext.Provider>
	)
}

export default Controls
