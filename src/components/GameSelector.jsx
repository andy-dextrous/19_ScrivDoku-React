import React from "react"
import ButtonIcon from "./ButtonIcon"

const Game_Selector = (props) => {
	const {
		start,
		isWinner,
		setDifficulty,
		setIsNewGameButtonClick,
		isNewGameButtonClick,
		setIsWinner,
	} = props

	function init(difficulty) {
		start()
		setDifficulty(difficulty)
		setIsNewGameButtonClick(!isNewGameButtonClick)
		setIsWinner(false)
	}

	return (
		<div id="dropDown" className={isWinner && "winner"}>
			<div>
				<h3 style={{ paddingBottom: "10px" }}>Select Difficulty</h3>
			</div>
			<div>
				<button
					onClick={() => {
						init("easy")
					}}>
					<ButtonIcon type={"difficulty"} />
					Easy
				</button>
				<button
					onClick={() => {
						init("medium")
					}}>
					<ButtonIcon type={"difficulty"} />
					Medium
				</button>
				<button
					onClick={() => {
						init("hard")
					}}>
					<ButtonIcon type={"difficulty"} />
					Hard
				</button>
				<button>
					<ButtonIcon type={"restart"} />
					Restart
				</button>
			</div>
		</div>
	)
}

export default Game_Selector
