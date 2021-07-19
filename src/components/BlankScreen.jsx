import React, { useContext } from "react"
import { FaPlay } from "react-icons/fa"
import { pausedContext } from "../App"

const BlankScreen = () => {
	const { isPaused, setIsPaused } = useContext(pausedContext)
	const iconStyle = {
		width: "100px",
		height: "100px",
		color: "#69A7F0",
		cursor: "pointer",
	}
	const pauseScreenStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	}

	return (
		<div style={pauseScreenStyle}>
			<FaPlay style={iconStyle} onClick={() => setIsPaused(!isPaused)} />
		</div>
	)
}

export default BlankScreen
