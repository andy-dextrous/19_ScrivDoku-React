import React, {useEffect, useState, useCallback} from 'react'
import './index.css';
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'
import Nav from './components/Nav'
import Display from './components/Display'
import {createSodokuBoard} from '../src/logic/CreateSodokuBoard'
import {setHiddenSquares} from '../src/logic/SetHiddenSquares'

export const boardContext = React.createContext()
export const pausedContext = React.createContext()

function App() {
  const [boardConfig, setBoardConfig] = useState([])
  const [difficulty, setDifficulty] = useState("easy")
  const EASY_SPACES = 45
  const MED_SPACES = 51
  const HARD_SPACES = 58
  const [isPaused, setIsPaused] = useState(false)
  const [omittedSquares, setOmittedSquares] = useState([])
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
  }, [numberOfHiddenSquares])

  // function setActiveTabListener() {
  //   if (document.hidden) {
  //     setIsPaused(true)
  //   } else {
  //     setIsPaused(false)
  //   }
  // }

  useEffect(() => {
    startNewGame()
  }, [startNewGame])

  // useEffect(()=> {
  //   document.addEventListener('visibilitychange', setActiveTabListener )
  //   return function cleanUp() {
  //     document.removeEventListener('visibilitychange', setActiveTabListener )
  //   }
  // }, [boardConfig])

    return (
    <boardContext.Provider value={boardConfig}>
      <pausedContext.Provider value={isPaused}>
        <Nav />
        <GameBoard board={boardConfig} 
                  difficulty={difficulty} 
                  omittedSquares={omittedSquares} 
                  isPaused={isPaused} 
                  setIsPaused={setIsPaused}/>
        <Controls startNewGame={startNewGame} 
                  setDifficulty={setDifficulty} 
                  difficulty={difficulty} 
                  setIsPaused={setIsPaused} 
                  isPaused={isPaused}/>
        <Display />
      </pausedContext.Provider>
    </boardContext.Provider>
    )
}

export default App;

