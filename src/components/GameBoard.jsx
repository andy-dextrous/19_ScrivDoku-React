import React, { useState, useEffect, useContext } from "react"
import Square from "./Square"
import BlankScreen from "./BlankScreen"
import { pausedContext, boardContext } from "../App"

const GameBoard = () => {
	const [selectedSquare, setSelectedSquare] = useState(null)
	const { isPaused } = useContext(pausedContext)
	const { boardConfig, omittedSquares } = useContext(boardContext)

	useEffect(() => {
		setSelectedSquare(null)
	}, [boardConfig])

	return (
		<div className="grid">
			{!isPaused ? (
				boardConfig.map((number, index) => {
					return (
						<Square
							key={index}
							number={number}
							index={index}
							hidden={omittedSquares.includes(index) ? true : false}
							setSelectedSquare={setSelectedSquare}
							selectedSquare={selectedSquare}
						/>
					)
				})
			) : (
				<BlankScreen />
			)}
		</div>
	)
}

export default GameBoard
