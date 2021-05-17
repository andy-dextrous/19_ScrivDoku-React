import React, {useState} from 'react'
import GameSelector from './GameSelector'
import {numbers} from '../logic/CreateSodokuBoard'
import NumberOption from './NumberOption'
import Counter from './Counter'

const Controls = ({startNewGame, setDifficulty}) => {
  
  const [isNewGameButtonClick, setIsNewGameButtonClick] = useState(false)

  return (
    <div className="controls" id="controls" style={{position:"relative"}}>
      <Counter />
      <button className="button" id="start-game" onClick={() => setIsNewGameButtonClick(!isNewGameButtonClick)}>New Game</button>
      <div className="number-option-container">
        {[...numbers].sort().map(number=>{
          return <NumberOption number={number} key={number} />
        })}
      </div>
      <button className="button green" id="check-score">Check Answers!</button>
      {isNewGameButtonClick && <GameSelector 
                      startNewGame={startNewGame} 
                      setDifficulty={setDifficulty} 
                      setIsNewGameButtonClick={setIsNewGameButtonClick} 
                      isNewGameButtonClick={isNewGameButtonClick}
                      />}
    </div>
  )
}

export default Controls
