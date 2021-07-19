import React, { useContext } from "react"
import { leadersContext } from "./../App"
import Leader from "./Leader"
import uuid from "react-uuid"

const LeaderBoard = (props) => {
	const { position, isWinner, submitting, submitLeaders, setSubmitting } = props
	const { leaders } = useContext(leadersContext)

	function submitAndClose() {
		submitLeaders()
		setSubmitting(false)
	}

	return isWinner && submitting ? (
		<div id="leaderboard" style={{ position: position }}>
			<input type="text" placeholder="name" id="name" />
			<button onClick={submitAndClose}>Save Score</button>
		</div>
	) : (
		<div id="leaderboard" style={{ position: position }}>
			{leaders.map((leader, i) => {
				return <Leader leader={leader} key={uuid()} i={i} />
			})}
		</div>
	)
}

export default LeaderBoard
