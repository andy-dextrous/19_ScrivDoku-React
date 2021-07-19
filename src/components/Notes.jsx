import React from 'react'
import Note from './Note'
import {numbers} from '../logic/CreateSodokuBoard'

const Notes = ({notes, boardConfig}) => {

  return (
    <div className="notes">
      {numbers.sort().map((number, index)=>{
        return <Note key={number} index={index} hidden={notes.includes(number)?false:true} number={number} boardConfig={boardConfig} />
      })}
    </div>
  )
}

export default Notes 
