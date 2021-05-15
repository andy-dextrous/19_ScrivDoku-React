import React from 'react'
import {WIDTH} from '../logic/CreateSodokuBoard'

const Square = ({number, index}) => {
  
  function determineBorders(index){
    let classes = []

    if (index % 3 === 0) {
      classes.push('sqr-bdr-left') 
    }
    if ((index + 1) % WIDTH === 0) {
      classes.push('sqr-bdr-right')
    }
    if (index < WIDTH) {
      classes.push('sqr-bdr-top')
    }
    if (index >= (WIDTH * WIDTH - WIDTH) ||
      (index > (WIDTH * 2) - 1 && index < (WIDTH * 3)) ||
      (index > (WIDTH * 5) - 1 && index < (WIDTH * 6))) {
        classes.push('sqr-bdr-bottom')
    }
    return classes.join(' ')
}

  return (
    <div className={"square " + determineBorders(index)}>
      {number}
    </div>
  )
}

export default Square
