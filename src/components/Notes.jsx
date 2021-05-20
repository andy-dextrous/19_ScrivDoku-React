import React from 'react'
import Note from './Note'
import {numbers} from '../logic/CreateSodokuBoard'

const Notes = ({notes}) => {
  return (
    <div className="notes">
      {numbers.sort().map((number)=>{
        return <Note key={number} hidden={notes.includes(number)?false:true} number={number} />
      })}
    </div>
  )
}

export default Notes 
