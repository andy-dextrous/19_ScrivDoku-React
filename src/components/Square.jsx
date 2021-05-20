import React, {useState, useEffect, useContext} from 'react'
import {WIDTH} from '../logic/CreateSodokuBoard'
import {numbers} from '../logic/CreateSodokuBoard'
import {pausedContext, boardContext} from '../App'

const Square = (props) => {
const {number, 
      index, 
      hidden,  
      setSelectedSquare, 
      selectedSquare} = props
const [isHovered, setIsHovered] = useState(false)
const [chosenNumber, setChosenNumber] = useState(null)
const isPaused = useContext(pausedContext)
const boardConfig = useContext(boardContext)
const [style, setStyle] = useState({color:"green"})

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
    if (selectedSquare === index && hidden) {
      classes.push('clickedNumber')
    }
    return classes.join(' ')
  }

  function handleClick() {
    setSelectedSquare(index)
  }

  useEffect(()=>{
    function inputValue(e) {
      const value = 
        e.type === 'click' ? 
        e.target.innerHTML : 
        e.key
      if (!hidden) return; 
      if (!numbers.includes(parseInt(value))) return; 
      setChosenNumber(value)
      setSelectedSquare(null)
      sessionStorage.setItem(index, value)
    }

    if(selectedSquare === index) {
      let numberButtons = document.querySelectorAll('.number-options')
      
      numberButtons.forEach(button=>{
       button.addEventListener('click', inputValue)
      })
      document.addEventListener("keydown", inputValue)
    }

    return () => {
      if(selectedSquare === index){
      let numberButtons = document.querySelectorAll('.number-options')
      numberButtons.forEach(button=>{
       button.removeEventListener('click', inputValue)
      })}
      document.removeEventListener("keydown", inputValue)
    }

  }, [selectedSquare, index, setSelectedSquare, hidden, chosenNumber])

  useEffect(() => {
    if (!isPaused)  {
    const persistedNumber = sessionStorage.getItem(index)
    setChosenNumber(persistedNumber)}
  }, [isPaused, index, boardConfig])


useEffect(()=>{
  const styleObject = {}

  if (isHovered && hidden && selectedSquare !== index) 
    styleObject.backgroundColor = "#f3f6fa"  
  if (chosenNumber && selectedSquare !== index) 
    styleObject.backgroundColor = '#f3f6fa'
  if (chosenNumber && chosenNumber !== number) 
    styleObject.color = "red"
  if (chosenNumber && parseInt(chosenNumber) === number) 
    styleObject.color = "green"
    
    setStyle(styleObject)

}, [isHovered, chosenNumber, hidden, index, selectedSquare, number])


  return (
    <div 
      className={"square " + determineBorders(index)} 
      onClick={handleClick}
      onMouseOver={()=> {setIsHovered(true)}}
      onMouseLeave={()=> {setIsHovered(false)}}
      style={style}
      >
      {!hidden && number}
      {hidden && chosenNumber}
    </div>
  )
}

export default Square

/*
 TODO: get chosenNumber to persist over pause state
*/