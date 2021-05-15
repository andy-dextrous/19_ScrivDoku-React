import React from 'react'
import Square from './Square'

const GameBoard = ({board}) => {
  return (
    
    <div className="grid">
      {board.map((number, index)=>{
        return <Square key={index} number={number} index={index} />
      })}
    </div>
  )
}

export default GameBoard
