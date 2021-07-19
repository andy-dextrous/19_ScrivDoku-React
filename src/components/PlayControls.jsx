import React, { useContext } from "react"
import Counter from "./Counter"
import ToggleNotes from "./ToggleNotes"
import ToggleCorrect from "./ToggleCorrect"
import ToggleLeader from "./ToggleLeader"
import NumberOptionContainer from "./NumberOptionContainer"
import GameSelector from "./GameSelector"
import LeaderBoard from "./LeaderBoard"
import ToolTips from "./ToolTips"
import StartButton from "./StartButton"
import {
	takeNotesTurnedOnContext,
	isCorrectContext,
	boardContext,
} from "../App"
import { ControlContext } from "./Controls"

const PlayControls = (props) => {
	const {
		handleClick,
		toggleNotes,
		toggleCorrect,
		toggleLeaderBoard,
		showLeaders,
	} = props

	// contexts
	const { takeNotesTurnedOn } = useContext(takeNotesTurnedOnContext)
	const { isCorrectTurnedOn } = useContext(isCorrectContext)
	const { omittedSquares, setDifficulty } = useContext(boardContext)
	const {
		isWinner,
		setIsWinner,
		setIsPlaced,
		start,
		isPlaced,
		isNewGameButtonClick,
		setIsNewGameButtonClick,
		finalTime,
	} = useContext(ControlContext)

	return (
		<div className="controls" id="controls">
			<Counter />
			<StartButton handleClick={handleClick} omittedSquares={omittedSquares} />
			<div className="in-game-controls">
				<ToggleNotes
					toggleNotes={toggleNotes}
					takeNotesTurnedOn={takeNotesTurnedOn}
				/>
				<ToggleCorrect
					toggleCorrect={toggleCorrect}
					isCorrectTurnedOn={isCorrectTurnedOn}
				/>
				<ToggleLeader
					toggleLeaderBoard={toggleLeaderBoard}
					showLeaders={showLeaders}
				/>
				<ToolTips />
			</div>
			<NumberOptionContainer />
			{isNewGameButtonClick && (
				<GameSelector
					start={start}
					setDifficulty={setDifficulty}
					setIsWinner={setIsWinner}
					setIsNewGameButtonClick={setIsNewGameButtonClick}
					isNewGameButtonClick={isNewGameButtonClick}
				/>
			)}
			{showLeaders && (
				<LeaderBoard
					position="absolute"
					finalTime={finalTime}
					isPlaced={isPlaced}
					setIsPlaced={setIsPlaced}
					isWinner={isWinner}
				/>
			)}
		</div>
	)
}

export default PlayControls
