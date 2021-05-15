import React from 'react'

const Controls = () => {
  return (
    <div className="controls" id="controls">
      <div className="count" id="count"></div>
      <button className="button" id="start-game">New Game</button>
      <div className="number-option-container">
        <div className="number-options" data-selection="1">1</div>
        <div className="number-options" data-selection="2">2</div>
        <div className="number-options" data-selection="3">3</div>
        <div className="number-options" data-selection="4">4</div>
        <div className="number-options" data-selection="5">5</div>
        <div className="number-options" data-selection="6">6</div>
        <div className="number-options" data-selection="7">7</div>
        <div className="number-options" data-selection="8">8</div>
        <div className="number-options" data-selection="9">9</div>
      </div>
      <button className="button green" id="check-score">Check Answers!</button>
    </div>
  )
}

export default Controls
