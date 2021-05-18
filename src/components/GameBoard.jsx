import React, {useState, useEffect} from 'react'
import Square from './Square'
import BlankScreen from './BlankScreen'


const GameBoard = (props) => {
  const [selectedSquare, setSelectedSquare] = useState(null)
  const {board, omittedSquares, isPaused, setIsPaused} = props
  
  useEffect(() => {
    setSelectedSquare(null)
  }, [board])

  if (!board) return
  return (
    <div className="grid">

      {!isPaused? board.map((number, index)=>{
        return <Square 
          key={index} 
          number={number} 
          index={index}
          hidden={omittedSquares.includes(index)? true :false}
          setSelectedSquare={setSelectedSquare}
          selectedSquare={selectedSquare}
          isPaused={isPaused}
          />
      }) :
      <BlankScreen setIsPaused={setIsPaused} isPaused={isPaused} />
      }
    </div>
  )
}
 
export default GameBoard
