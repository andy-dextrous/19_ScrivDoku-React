import React, { useState, useContext, useEffect } from "react";
import GameSelector from "./GameSelector";
import LeaderBoard from "./LeaderBoard";
import ToggleNotes from "./ToggleNotes";
import ToggleCorrect from "./ToggleCorrect";
import ToggleLeader from "./ToggleLeader";
import NumberOption from "./NumberOption";
import Counter from "./Counter";

import {
	takeNotesTurnedOnContext,
	isCorrectContext,
	pausedContext,
	boardContext,
	leadersContext,
} from "../App";
import { createPopper } from "@popperjs/core";
import { numbers } from "../logic/CreateSodokuBoard";

const Controls = (props) => {
	//props
	const {
		startNewGame,
		setDifficulty,
		difficulty,
		omittedSquares,
		chosenNumbers,
		submitting,
		setSubmitting,
		setSubmitted,
		submitted,
	} = props;
	// submitting will be the state for posting JSON, placementConfirmed will be whether a top 3 spot has been earned

	//state
	const [isNewGameButtonClick, setIsNewGameButtonClick] = useState(false);
	const [isPlaced, setIsPlaced] = useState(false);
	const [showLeaders, setShowLeaders] = useState(false);
	const [isWinner, setIsWinner] = useState(false);
	const [finalTime, setFinalTime] = useState("00:00");
	// contexts
	const { takeNotesTurnedOn, setTakeNotesTurnedOn } = useContext(
		takeNotesTurnedOnContext
	);
	const { leaders } = useContext(leadersContext);
	const { isCorrectTurnedOn, setIsCorrectTurnedOn } =
		useContext(isCorrectContext);
	const { isPaused, setIsPaused } = useContext(pausedContext);
	const boardConfig = useContext(boardContext);
	// Reset button
	const start = () => {
		setShowLeaders(false);
		setSubmitting(false);
		setFinalTime("00:00");
		setIsPlaced(false);
		setSubmitted(false);
		startNewGame();
	};

	// New Game/Check Scores button click handler
	const handleClick = () => {
		chosenNumbers.length === omittedSquares.length
			? checkForWin()
			: setIsNewGameButtonClick(!isNewGameButtonClick);
	};

	// If all squares are filled with numbers, check to see if they are all correct
	const checkForWin = () => {
		const squaresFromDOM = document.querySelectorAll(".grid .square");
		const allAnswers = [];
		squaresFromDOM.forEach((square) => {
			const inner = square.querySelector(".chosenNumber").innerHTML;
			const number = parseInt(inner);
			allAnswers.push(number);
		});

		const winner = allAnswers.every((answer, index) => {
			return boardConfig[index] === answer;
		});

		winner ? showWin() : showIncorrect();
	};

	// Convert the final time string to just seconds for comparison
	function getSecs(timeString) {
		const timeInt = timeString.split(":").map((time) => {
			return parseInt(time);
		});
		const totalSecs = timeInt[0] * 60 + timeInt[1];
		return totalSecs;
	}

	// If every square is correct, freeze the timer and display success screen
	function showWin() {
		const timerDisplay = document.getElementById("timer").innerText.trim();
		setFinalTime(timerDisplay);
		setShowLeaders(true);
		setIsWinner(true);
	}

	// Wait until Final Time state has been updated before running this effect
	useEffect(() => {
		if (finalTime === "00:00" || submitted) return;
		function checkScores() {
			const finalTimeSeconds = getSecs(finalTime);
			const topThreeScores = leaders.map((leader) => {
				return getSecs(leader.time);
			});
			const hasHigherScore = topThreeScores.some((score) => {
				return score > finalTimeSeconds;
			});

			return hasHigherScore;
		}

		const placement = checkScores();
		setIsPlaced(placement);
	}, [finalTime, leaders, isPlaced, isWinner, submitted]);

	useEffect(() => {
		if (isPlaced && isWinner && !submitted) {
			setSubmitting(true);
		}
	}, [isPlaced, setSubmitting, submitting, isWinner, submitted]);

	const submitLeaders = () => {
		console.log("is submitting = " + submitting);
		if (!submitting) return;
		const newPlacement = {};
		newPlacement.name = document.getElementById("name").value.trim();
		newPlacement.time = finalTime;
		newPlacement.mode = difficulty;
		const allLeaders = [...leaders, newPlacement];
		allLeaders.sort((a, b) => parseFloat(getSecs(a.time) - getSecs(b.time)));
		const newLeaders = allLeaders.slice(0, 3);
		const raw = JSON.stringify(newLeaders);
		const requestOptions = {
			method: "POST",
			body: raw,
			redirect: "follow",
		};

		const data = fetch(
			"https://api.npoint.io/ad063b6049b34a7713c0",
			requestOptions
		)
			.then((response) => response.text())
			.then((response) => {
				return response;
			})
			.catch((error) => console.log("error", error));

		setSubmitted(true);

		return data;
	};

	//after this submitting and placed should be false

	function showIncorrect() {
		setIsCorrectTurnedOn(true);
		setTimeout(() => {
			setIsCorrectTurnedOn(false);
		}, 2000);
	}

	function toggleNotes() {
		setTakeNotesTurnedOn(!takeNotesTurnedOn);
	}

	function toggleCorrect() {
		setIsCorrectTurnedOn(!isCorrectTurnedOn);
	}

	function toggleLeaderBoard() {
		setShowLeaders(!showLeaders);
	}

	function createTooltip(target, tooltip) {
		const popperInstance = createPopper(target, tooltip, {
			placement: "right",
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [0, 8],
					},
				},
			],
		});
		function show() {
			tooltip.setAttribute("data-show", "");
			popperInstance.update();
		}

		function hide() {
			tooltip.removeAttribute("data-show");
		}

		const showEvents = ["mouseenter", "focus"];
		const hideEvents = ["mouseleave", "blur"];

		showEvents.forEach((event) => {
			target.addEventListener(event, show);
		});

		hideEvents.forEach((event) => {
			target.addEventListener(event, hide);
		});
	}

	useEffect(() => {
		const notes = document.querySelector("#toggleNotes");
		const tooltipNotes = document.querySelector("#tooltip-notes");
		const showAnswers = document.querySelector("#toggleCorrect");
		const tooltipAnswers = document.querySelector("#tooltip-answers");

		createTooltip(notes, tooltipNotes);
		createTooltip(showAnswers, tooltipAnswers);
	}, []);

	return !isWinner ? (
		<div className="controls" id="controls" style={{ position: "relative" }}>
			<Counter
				difficulty={difficulty}
				setIsPaused={setIsPaused}
				isPaused={isPaused}
			/>
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
				<div id="tooltip-notes" className="tooltip" role="tooltip">
					Have an idea what number might be in this square? Click to take notes.
					<div className="arrow" id="arrow" data-popper-arrow></div>
				</div>
				<div id="tooltip-answers" className="tooltip" role="tooltip">
					Click to reveal which answers you have right so far!
					<div className="arrow" id="arrow" data-popper-arrow></div>
				</div>
			</div>
			<div className="number-option-container">
				{[...numbers].sort().map((number) => {
					return <NumberOption number={number} key={number} />;
				})}
			</div>

			{isNewGameButtonClick && (
				<GameSelector
					startNewGame={start}
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
	) : (
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
					setIsNewGameButtonClick(!isNewGameButtonClick);
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
	);
};

export default Controls;
