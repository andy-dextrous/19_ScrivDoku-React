import React from "react";
import { FaCrown } from "react-icons/fa";

const ToggleLeader = ({ toggleLeaderBoard, showLeaders }) => {
	return (
		<button
			id="toggleNotes"
			style={showLeaders ? { backgroundColor: "#222222" } : {}}
			onClick={toggleLeaderBoard}>
			<FaCrown />
		</button>
	);
};

export default ToggleLeader;