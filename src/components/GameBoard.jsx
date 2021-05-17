import React,{useContext} from 'react'
import Square from './Square'
import {WIDTH} from '../logic/CreateSodokuBoard'
import {boardContext} from '../App'

const GameBoard = ({board, difficulty}) => {
  const EASY_SPACES = 45
  const MED_SPACES = 51
  const HARD_SPACES = 58
  const omittedSquares = []
  const boardConfig = useContext(boardContext)



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

  if (!board) return
  return (
    <div className="grid">
      {board.map((number, index)=>{
        return <Square 
          key={index} 
          number={number} 
          index={index}
          hidden={omittedSquares.includes(index)? true :false}
          />
      })}
    </div>
  )
}
 
export default GameBoard
