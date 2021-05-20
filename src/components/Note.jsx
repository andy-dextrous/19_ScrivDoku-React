import React from 'react'

const Note = ({number, hidden}) => {
  return (
    <span>{hidden?'':number}</span>
  )
}

export default Note
