import React, {useEffect, useState} from 'react'
import './index.css';
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'
import Nav from './components/Nav'
import Display from './components/Display'
import {createSodokuBoard} from '../src/logic/CreateSodokuBoard'
import {WIDTH} from '../src/logic/CreateSodokuBoard'

export const boardContext = React.createContext()

function App() {
  const [boardConfig, setBoardConfig] = useState([])
  const [difficulty, setDifficulty] = useState("easy")
  const EASY_SPACES = 45
  const MED_SPACES = 51
  const HARD_SPACES = 58
  const omittedSquares = []

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

const pickRandomSquare = (chosenIndexes) => {
  let randomSelection = Math.floor(Math.random() * WIDTH * WIDTH)
  if (!chosenIndexes.includes(randomSelection))  {
      return randomSelection
      } else {  
      return pickRandomSquare(chosenIndexes)
    }
}

for(let i=0; i<numberOfHiddenSquares; i++){
  omittedSquares.push(pickRandomSquare(omittedSquares))
}

  const startNewGame = () => {  
    setBoardConfig(createSodokuBoard())
  }

  useEffect(() => {
    startNewGame()
    console.log('App level')
  }, [])



    return (
    <boardContext.Provider value={boardConfig}>
      <Nav />
      <GameBoard board={boardConfig} difficulty={difficulty} omittedSquares={omittedSquares} />
      <Controls startNewGame={startNewGame} setDifficulty={setDifficulty} difficulty={difficulty}/>
      <Display />
    </boardContext.Provider>
    )
}

export default App;

