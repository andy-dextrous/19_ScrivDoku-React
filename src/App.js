import React, { useEffect, useState, useCallback } from "react"
import "./index.css"
import GameBoard from "./components/GameBoard"
import Controls from "./components/Controls"
import Nav from "./components/Nav"
import { createSodokuBoard } from "../src/logic/CreateSodokuBoard"
import { setHiddenSquares } from "../src/logic/SetHiddenSquares"

export const boardContext = React.createContext()
export const pausedContext = React.createContext()
export const isCorrectContext = React.createContext()
export const takeNotesTurnedOnContext = React.createContext()
export const chosenNumbersContext = React.createContext()
export const leadersContext = React.createContext()
export const submissionContext = React.createContext()

function App() {
	const EASY_SPACES = 30
	const MED_SPACES = 45
	const HARD_SPACES = 50
	const [boardConfig, setBoardConfig] = useState([])
	const [difficulty, setDifficulty] = useState("easy")
	const [isPaused, setIsPaused] = useState(true)
	const [omittedSquares, setOmittedSquares] = useState([])
	const [isCorrectTurnedOn, setIsCorrectTurnedOn] = useState(false)
	const [takeNotesTurnedOn, setTakeNotesTurnedOn] = useState(false)
	const [chosenNumbers, setChosenNumbers] = useState([])
	const [leaders, setLeaders] = useState([])
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	// use global variables to return correct string
	const randomiseIndex = (difficulty) => {
		switch (difficulty) {
			case "easy":
				return EASY_SPACES
			case "medium":
				return MED_SPACES
			case "hard":
				return HARD_SPACES
			default:
				return 0
		}
	}
	const numberOfHiddenSquares = randomiseIndex(difficulty)

	const startNewGame = useCallback(() => {
		sessionStorage.clear()
		let newBoardConfig = []
		while (newBoardConfig.length < 81) {
			newBoardConfig = createSodokuBoard()
		}
		setBoardConfig(newBoardConfig)
		setOmittedSquares(setHiddenSquares(newBoardConfig, numberOfHiddenSquares))
		setChosenNumbers([])
		setIsPaused(false)
	}, [numberOfHiddenSquares])

	useEffect(() => {
		function process(posts) {
			setLeaders(posts)
		}
		fetch("https://api.npoint.io/ad063b6049b34a7713c0")
			.then((res) => res.json())
			.then((data) => process(data))
			.catch((err) => console.log(err))
	}, [submitting])

	useEffect(() => {
		startNewGame()
	}, [startNewGame])

	return (
		<boardContext.Provider
			value={{ boardConfig, omittedSquares, difficulty, setDifficulty }}>
			<pausedContext.Provider value={{ isPaused, setIsPaused }}>
				<chosenNumbersContext.Provider
					value={{ chosenNumbers, setChosenNumbers }}>
					<isCorrectContext.Provider
						value={{ isCorrectTurnedOn, setIsCorrectTurnedOn }}>
						<takeNotesTurnedOnContext.Provider
							value={{ takeNotesTurnedOn, setTakeNotesTurnedOn }}>
							<leadersContext.Provider value={{ leaders, setLeaders }}>
								<submissionContext.Provider
									value={{
										submitted,
										setSubmitted,
										submitting,
										setSubmitting,
									}}>
									{/* This is where the components are rendered */}
									<Nav />
									<GameBoard />
									<Controls startNewGame={startNewGame} />
									{/* End Components */}
								</submissionContext.Provider>
							</leadersContext.Provider>
						</takeNotesTurnedOnContext.Provider>
					</isCorrectContext.Provider>
				</chosenNumbersContext.Provider>
			</pausedContext.Provider>
		</boardContext.Provider>
	)
}

export default App
