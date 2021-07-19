import React from 'react'

const Note = (props) => {

  const {number, hidden, chosenNumber} = props
  return (
    <span>{ hidden && !chosenNumber? '' : number }</span>
  )
}

export default Note
