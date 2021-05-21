import React, {useState, useContext} from 'react'
import GameSelector from './GameSelector'
import {numbers} from '../logic/CreateSodokuBoard'
import NumberOption from './NumberOption'
import Counter from './Counter'
import { FaPen, FaQuestion } from 'react-icons/fa'
import {takeNotesTurnedOnContext, isCorrectContext} from '../App'

const Controls = (props) => {
  const {startNewGame, setDifficulty, difficulty, setIsPaused, isPaused} = props
  const [isNewGameButtonClick, setIsNewGameButtonClick] = useState(false)
  const {takeNotesTurnedOn, setTakeNotesTurnedOn} = useContext(takeNotesTurnedOnContext) 
  const {isCorrectTurnedOn, setIsCorrectTurnedOn} = useContext(isCorrectContext) 

  return (
    <div className="controls" id="controls" style={{position:"relative"}}>
      <Counter 
              difficulty = {difficulty} 
              setIsPaused ={setIsPaused} 
              isPaused={isPaused}/>
      <button 
            className="button" 
            id="start-game" 
            onClick={() => setIsNewGameButtonClick(!isNewGameButtonClick)}>New Game</button>
      <div className="in-game-controls">
        <button 
              style={takeNotesTurnedOn ? 
              {backgroundColor:'#222222'}:
              {}} 
              onClick={()=>{setTakeNotesTurnedOn(!takeNotesTurnedOn)}}><FaPen /></button>
        <button 
              style={isCorrectTurnedOn? 
              {backgroundColor:'#222222'}:
              {}} 
              onClick={()=>{setIsCorrectTurnedOn(!isCorrectTurnedOn)}}><FaQuestion /></button>
      </div>
      <div className="number-option-container">
        {[...numbers].sort().map(number=>{
          return <NumberOption number={number} key={number} />
        })}
      </div>
      {/* <button className="button green" id="check-score">Check Answers!</button> */}
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
