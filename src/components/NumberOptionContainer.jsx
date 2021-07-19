import React from "react"
import { numbers } from "../logic/CreateSodokuBoard"
import NumberOption from "./NumberOption"

const NumberOptionContainer = () => {
	return (
		<div className="number-option-container">
			{[...numbers].sort().map((number) => {
				return <NumberOption number={number} key={number} />
			})}
		</div>
	)
}

export default NumberOptionContainer
