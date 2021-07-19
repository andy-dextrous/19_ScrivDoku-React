import React, { useEffect } from "react"
import { createPopper } from "@popperjs/core"

const ToolTips = () => {
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
		})
		function show() {
			tooltip.setAttribute("data-show", "")
			popperInstance.update()
		}

		function hide() {
			tooltip.removeAttribute("data-show")
		}

		const showEvents = ["mouseenter", "focus"]
		const hideEvents = ["mouseleave", "blur"]

		showEvents.forEach((event) => {
			target.addEventListener(event, show)
		})

		hideEvents.forEach((event) => {
			target.addEventListener(event, hide)
		})
	}

	useEffect(() => {
		const notes = document.querySelector("#toggleNotes")
		const tooltipNotes = document.querySelector("#tooltip-notes")
		const showAnswers = document.querySelector("#toggleCorrect")
		const tooltipAnswers = document.querySelector("#tooltip-answers")

		createTooltip(notes, tooltipNotes)
		createTooltip(showAnswers, tooltipAnswers)
	}, [])
	return (
		<div className="toolTips">
			<div id="tooltip-notes" className="tooltip" role="tooltip">
				Have an idea what number might be in this square? Click to take notes.
				<div className="arrow" id="arrow" data-popper-arrow></div>
			</div>
			<div id="tooltip-answers" className="tooltip" role="tooltip">
				Click to reveal which answers you have right so far!
				<div className="arrow" id="arrow" data-popper-arrow></div>
			</div>
		</div>
	)
}

export default ToolTips
