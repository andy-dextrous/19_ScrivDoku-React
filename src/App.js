import React, {useEffect, useState, useCallback} from 'react'
import './index.css';
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'
import Nav from './components/Nav'
import {createSodokuBoard} from '../src/logic/CreateSodokuBoard'
import {setHiddenSquares} from '../src/logic/SetHiddenSquares'

export const boardContext = React.createContext()
export const pausedContext = React.createContext()
export const isCorrectContext = React.createContext()
export const takeNotesTurnedOnContext = React.createContext()
export const chosenNumbersContext = React.createContext()

/*
  const EASY_SPACES = 45
  const MED_SPACES = 51
  const HARD_SPACES = 58
*/

function App() {
  const [boardConfig, setBoardConfig] = useState([])
  const [difficulty, setDifficulty] = useState("easy")
  const EASY_SPACES = 30
  const MED_SPACES = 45
  const HARD_SPACES = 50
  const [isPaused, setIsPaused] = useState(false)
  const [omittedSquares, setOmittedSquares] = useState([])
  const [isCorrectTurnedOn, setIsCorrectTurnedOn] = useState(false)
  const [takeNotesTurnedOn, setTakeNotesTurnedOn] = useState(false)
  const [chosenNumbers,setChosenNumbers] = useState([])
  
  
  // use global variables to return correct string
  const randomiseIndex = (difficulty) => {
    switch (difficulty) {
      case "easy" : 
        return EASY_SPACES
      case "medium" : 
        return MED_SPACES
      case "hard" : 
        return HARD_SPACES
      default: 
        return 0
    }
  }
  const numberOfHiddenSquares = randomiseIndex(difficulty)

  const startNewGame = useCallback(() => {
    sessionStorage.clear()
    setBoardConfig(createSodokuBoard())
    setOmittedSquares(setHiddenSquares(numberOfHiddenSquares))
    setChosenNumbers([])
  }, [numberOfHiddenSquares])

  function setActiveTabListener() {
    if (document.hidden) {
      setIsPaused(true)
    } else {
      setIsPaused(false)
    }
  }

  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  useEffect(()=> {
    document.addEventListener('visibilitychange', setActiveTabListener )
    return function cleanUp() {
      document.removeEventListener('visibilitychange', setActiveTabListener )
    }
  }, [boardConfig])

    return (
    <boardContext.Provider value={boardConfig}>
      <pausedContext.Provider value={isPaused}>
        <isCorrectContext.Provider value={{isCorrectTurnedOn, setIsCorrectTurnedOn}}>
          <takeNotesTurnedOnContext.Provider value={{takeNotesTurnedOn, setTakeNotesTurnedOn}}>
            <chosenNumbersContext.Provider value={{chosenNumbers, setChosenNumbers}}>
              <Nav />         
              <GameBoard board={boardConfig} 
                        difficulty={difficulty} 
                        omittedSquares={omittedSquares} 
                        isPaused={isPaused} 
                        setIsPaused={setIsPaused}/>
              <Controls startNewGame={startNewGame} 
                        board={boardConfig} 
                        setDifficulty={setDifficulty} 
                        difficulty={difficulty} 
                        setIsPaused={setIsPaused} 
                        isPaused={isPaused}
                        omittedSquares={omittedSquares}
                        chosenNumbers={chosenNumbers} />       
            </chosenNumbersContext.Provider>
          </takeNotesTurnedOnContext.Provider>
        </isCorrectContext.Provider>
      </pausedContext.Provider>
    </boardContext.Provider>
    )
}

export default App;

