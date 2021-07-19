import React from "react"
import { FaCrown } from "react-icons/fa"

const Leader = ({ leader, i }) => {
	return (
		<div className="leader">
			<li key={leader.name}>
				{i === 0 && (
					<div className="victor">
						<FaCrown />
					</div>
				)}
				<span className="leader-name">{i + 1 + ". " + leader.name}</span>
				<span className="leader-mode">{leader.mode}</span>
				<span className="leader-time">{leader.time}</span>
			</li>
		</div>
	)
}

export default Leader
