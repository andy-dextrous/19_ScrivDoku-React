import React, {useState, useEffect} from 'react'
import Square from './Square'


const GameBoard = ({board, omittedSquares}) => {

  const [selectedSquare, setSelectedSquare] = useState(null)

  useEffect(() => {
    setSelectedSquare(null)
  }, [board])

  if (!board) return
  return (
    <div className="grid">
      {board.map((number, index)=>{
        return <Square 
          key={index} 
          number={number} 
          index={index}
          hidden={omittedSquares.includes(index)? true :false}
          setSelectedSquare={setSelectedSquare}
          selectedSquare={selectedSquare}
          />
      })}
    </div>
  )
}
 
export default GameBoard
