import React from "react";
import { FaPen } from "react-icons/fa";

const ToggleNotes = ({ toggleNotes, takeNotesTurnedOn }) => {
	return (
		<button
			id="toggleNotes"
			style={takeNotesTurnedOn ? { backgroundColor: "#222222" } : {}}
			onClick={toggleNotes}>
			<FaPen />
		</button>
	);
};

export default ToggleNotes;
