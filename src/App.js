import React, {useEffect, useState} from 'react'
import './index.css';
import GameBoard from './components/GameBoard'
import Controls from './components/Controls'
import Nav from './components/Nav'
import Display from './components/Display'
import {createSodokuBoard} from './logic/CreateSodokuBoard'

export const boardContext = React.createContext()

function App() {
  const [boardConfig, setBoardConfig] = useState([])
  const [difficulty, setDifficulty] = useState("easy")

  const startNewGame = () => {  
    setBoardConfig(createSodokuBoard())
  }

  useEffect(() => {
    startNewGame()
  }, [])

    return (
    <boardContext.Provider value={boardConfig}>
      <Nav />
      <GameBoard board={boardConfig} difficulty={difficulty}/>
      <Controls startNewGame={startNewGame} setDifficulty={setDifficulty} />
      <Display />
    </boardContext.Provider>
    )
}

export default App;

