import {useEffect, useState} from 'react'
import './index.css';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls'
import Nav from './components/Nav'
import Display from './components/Display'
import {createSodokuBoard} from './logic/CreateSodokuBoard'

function App() {
const [boardConfig, setBoardConfig] = useState([])

useEffect(() => {
  let newBoard = createSodokuBoard()
  setBoardConfig(newBoard)
}, [])

  return (
  <>  
  <Nav />
  <GameBoard board={boardConfig} />
  <Controls />
  <Display />
  </>
  )
}

export default App;

