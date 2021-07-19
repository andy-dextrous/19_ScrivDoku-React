import GameSelector from "./GameSelector"
import LeaderBoard from "./LeaderBoard"
import React, { useEffect, useContext } from "react"
import { leadersContext, submissionContext, boardContext } from "./../App"
import { ControlContext } from "./Controls"

const WinControls = () => {
	const { leaders } = useContext(leadersContext)
	const { setDifficulty, difficulty } = useContext(boardContext)
	const { setSubmitting, setSubmitted, submitted, submitting } =
		useContext(submissionContext)
	const {
		isWinner,
		setIsWinner,
		setIsPlaced,
		isPlaced,
		isNewGameButtonClick,
		setIsNewGameButtonClick,
		finalTime,
		start,
	} = useContext(ControlContext)

	// Convert the final time string to just seconds for comparison
	function getSecs(timeString) {
		const timeInt = timeString.split(":").map((time) => {
			return parseInt(time)
		})
		const totalSecs = timeInt[0] * 60 + timeInt[1]
		return totalSecs
	}

	// Wait until Final Time state has been updated before running this effect
	useEffect(() => {
		if (finalTime === "00:00" || submitted) return
		function checkScores() {
			const finalTimeSeconds = getSecs(finalTime)
			const topThreeScores = leaders.map((leader) => {
				return getSecs(leader.time)
			})
			const hasHigherScore = topThreeScores.some((score) => {
				return score > finalTimeSeconds
			})

			return hasHigherScore
		}

		const placement = checkScores()
		setIsPlaced(placement)
	}, [finalTime, leaders, isPlaced, isWinner, submitted, setIsPlaced])

	useEffect(() => {
		if (isPlaced && isWinner && !submitted) {
			setSubmitting(true)
		}
	}, [isPlaced, setSubmitting, submitting, isWinner, submitted])

	const submitLeaders = () => {
		console.log("is submitting = " + submitting)
		if (!submitting) return
		const newPlacement = {}
		newPlacement.name = document.getElementById("name").value.trim()
		newPlacement.time = finalTime
		newPlacement.mode = difficulty
		const allLeaders = [...leaders, newPlacement]
		allLeaders.sort((a, b) => parseFloat(getSecs(a.time) - getSecs(b.time)))
		const newLeaders = allLeaders.slice(0, 3)
		const raw = JSON.stringify(newLeaders)
		const requestOptions = {
			method: "POST",
			body: raw,
			redirect: "follow",
		}

		const data = fetch(
			"https://api.npoint.io/ad063b6049b34a7713c0",
			requestOptions
		)
			.then((response) => response.text())
			.then((response) => {
				return response
			})
			.catch((error) => console.log("error", error))

		setSubmitted(true)

		return data
	}

	return (
		<div className="display">
			<img
				src="https://res.cloudinary.com/aromas-coffee-roasters/image/upload/v1621641508/thrust_b6odes.gif"
				alt="thrust"></img>
			<span id="finalTime">{finalTime}</span>
			<LeaderBoard
				position="relative"
				finalTime={finalTime}
				isPlaced={isPlaced}
				setIsPlaced={setIsPlaced}
				difficulty={difficulty}
				isWinner={isWinner}
				submitting={submitting}
				setSubmitting={setSubmitting}
				submitLeaders={submitLeaders}
			/>
			<div className="message-container">
				<h2 className="success-message">
					{isPlaced
						? "Holy shit you're good!"
						: "Sorry, you ain't leadership material... yet"}
				</h2>
			</div>
			<button
				className="button start"
				id="start-game"
				onClick={() => {
					setIsNewGameButtonClick(!isNewGameButtonClick)
				}}>
				{isPlaced ? "But can you do it again?" : "Try again!"}
			</button>
			{isNewGameButtonClick && (
				<GameSelector
					isWinner={isWinner}
					startNewGame={start}
					setIsWinner={setIsWinner}
					setDifficulty={setDifficulty}
					setIsNewGameButtonClick={setIsNewGameButtonClick}
					isNewGameButtonClick={isNewGameButtonClick}
				/>
			)}
		</div>
	)
}

export default WinControls
