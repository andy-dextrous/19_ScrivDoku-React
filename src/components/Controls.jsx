import React, {useState, useContext} from 'react'
import GameSelector from './GameSelector'
import {numbers} from '../logic/CreateSodokuBoard'
import NumberOption from './NumberOption'
import Counter from './Counter'
import { FaPen, FaQuestion } from 'react-icons/fa'
import {takeNotesTurnedOnContext, isCorrectContext, pausedContext, boardContext} from '../App'

const Controls = (props) => {
  const {startNewGame, setDifficulty, difficulty, omittedSquares, chosenNumbers} = props
  const [isNewGameButtonClick, setIsNewGameButtonClick] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const [finalTime, setFinalTime] = useState("00:00")
  const {takeNotesTurnedOn, setTakeNotesTurnedOn} = useContext(takeNotesTurnedOnContext) 
  const {isCorrectTurnedOn, setIsCorrectTurnedOn} = useContext(isCorrectContext) 
  const {isPaused, setIsPaused} = useContext(pausedContext) 
  const boardConfig = useContext(boardContext) 

  const handleClick = () => {
    chosenNumbers.length === omittedSquares.length ?
    checkForWin() :
    setIsNewGameButtonClick(!isNewGameButtonClick)
  }

  const checkForWin = ()=>{
    const squaresFromDOM = document.querySelectorAll('.grid .square')
    const allAnswers = []
    squaresFromDOM.forEach(square=>{
      const number = parseInt(square.innerHTML)
      allAnswers.push(number)
    })

    const winner = allAnswers.every((answer, index)=>{
      return boardConfig[index] === answer
    })
   
    winner ? showWin() : showIncorrect()
  }

  function showWin() {
    const timerDisplay = document.getElementById('timer').innerText.trim()
    setFinalTime(timerDisplay)
    setIsWinner(true)
  }

  function showIncorrect() {
    setIsCorrectTurnedOn(true)
    setTimeout(()=>{
      setIsCorrectTurnedOn(false)
    }, 2000)
  }

  function toggleNotes() {
    setTakeNotesTurnedOn(!takeNotesTurnedOn)
  }

  function toggleCorrect() {
    setIsCorrectTurnedOn(!isCorrectTurnedOn)
  }

  return (
    !isWinner? 
    <div className="controls" id="controls" style={{position:"relative"}}>
      <Counter 
              difficulty = {difficulty} 
              setIsPaused ={setIsPaused} 
              isPaused={isPaused}/>
      <button 
            className="button" 
            id="start-game" 
            style={chosenNumbers.length === omittedSquares.length ? {backgroundColor:"green"} : {}}
            onClick={handleClick}>
              { chosenNumbers.length === omittedSquares.length ? "Check Answers!" : "New Game" }
      </button>
      <div className="in-game-controls">
        <button 
              style={takeNotesTurnedOn ? 
              {backgroundColor:'#222222'}:
              {}} 
              onClick={toggleNotes}><FaPen /></button>
        <button 
              style={isCorrectTurnedOn? 
              {backgroundColor:'#222222'}:
              {}} 
              onClick={toggleCorrect}><FaQuestion /></button>
      </div>
      <div className="number-option-container">
        {[...numbers].sort().map(number=>{
          return <NumberOption number={number} key={number} />
        })}
      </div>

      {isNewGameButtonClick && <GameSelector 
                      startNewGame={startNewGame} 
                      setDifficulty={setDifficulty} 
                      setIsWinner={setIsWinner}
                      setIsNewGameButtonClick={setIsNewGameButtonClick} 
                      isNewGameButtonClick={isNewGameButtonClick}
                      />}
    </div>
    :
    <div className="display">
      <img src="https://res.cloudinary.com/aromas-coffee-roasters/image/upload/v1621641508/thrust_b6odes.gif" alt="thrust"></img>
      <div className="message-container">
        <h2 className='success-message'>Holy shit you're good!</h2>
        <span id="finalTime">{finalTime}</span>
      </div>
      <button 
            className="button start" 
            id="start-game" 
            onClick={()=>{setIsNewGameButtonClick(!isNewGameButtonClick)}}>
            But can you do it again?
      </button>
      {isNewGameButtonClick && <GameSelector 
                      isWinner={isWinner}
                      startNewGame={startNewGame} 
                      setIsWinner={setIsWinner}
                      setDifficulty={setDifficulty} 
                      setIsNewGameButtonClick={setIsNewGameButtonClick} 
                      isNewGameButtonClick={isNewGameButtonClick}
                      
       />}
    </div>
  )
}

export default Controls
