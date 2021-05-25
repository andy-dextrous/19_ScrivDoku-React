import React, {useState, useEffect, useContext} from 'react'
import {WIDTH, numbers} from '../logic/CreateSodokuBoard'
import {pausedContext, boardContext, takeNotesTurnedOnContext, isCorrectContext, chosenNumbersContext} from '../App'
import Notes from './Notes'

const Square = (props) => {
  const {number, 
        index, 
        hidden,  
        setSelectedSquare, 
        selectedSquare} = props
  // Local state      
  const [isHovered, setIsHovered] = useState(false)
  const [chosenNumber, setChosenNumber] = useState(null)
  const [style, setStyle] = useState({})
  const [notes, setNotes] = useState([])
  // Global State
  const {isPaused} = useContext(pausedContext)
  const {takeNotesTurnedOn} = useContext(takeNotesTurnedOnContext) 
  const {isCorrectTurnedOn} = useContext(isCorrectContext) 
  const boardConfig = useContext(boardContext)
  const {chosenNumbers, setChosenNumbers} = useContext(chosenNumbersContext)

  // Build out the grid in CSS
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

  // Make this the currently selected square
  function handleClick() {
    hidden && setSelectedSquare(index)
  }

  // Handle an event while currently selected
  useEffect(()=>{
    function inputValue(e) {
      const value = 
        e.type === 'click' ? 
        e.target.innerHTML : 
        e.key
        if (!hidden) return; 
        if (!numbers.includes(parseInt(value)) && e.key !== 'Backspace') return;
        if(!takeNotesTurnedOn){
          setChosenNumber(value)
          if(!chosenNumbers.includes(index)){
             setChosenNumbers([...chosenNumbers, index])
            }
          setSelectedSquare(null)
          sessionStorage.setItem(index, value)
          setNotes([])
         }
        if ( e.key === 'Backspace' ) {
          setChosenNumber(null)
          setChosenNumbers(chosenNumbers.filter(chosen=>{
            return chosen !== index
          }))
          setSelectedSquare(null)
          sessionStorage.removeItem(index)
         }
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
  }, [selectedSquare, index, setSelectedSquare, hidden, chosenNumber, takeNotesTurnedOn, chosenNumbers, setChosenNumbers])

  // change style state
  useEffect(()=>{
    const styleObject = {}
    if (chosenNumber) {
      styleObject.color="#69a7f0"}
    if (isHovered && hidden && selectedSquare !== index) 
      styleObject.backgroundColor = "#f3f6fa"  
    if (chosenNumber && selectedSquare !== index) 
      styleObject.backgroundColor = '#f3f6fa'
    if (chosenNumber && chosenNumber !== number && isCorrectTurnedOn) 
      {styleObject.color = "#FFF"
      styleObject.backgroundColor ="#BA1200"}
    if (chosenNumber && parseInt(chosenNumber) === number && isCorrectTurnedOn) 
      {styleObject.backgroundColor = "#08A045"
       styleObject.color="#FFF"}
      
      setStyle(styleObject)

  }, [isHovered, chosenNumber, hidden, index, selectedSquare, number, isCorrectTurnedOn])

  // Allow note taking function while button is active
  useEffect(()=>{
    if(!takeNotesTurnedOn || chosenNumber || selectedSquare !== index ) return; 
    function handleNote(e) {
        const value = 
          e.type === 'click' ? e.target.innerHTML : e.key
          if (!hidden) return; 
          if (numbers.includes(parseInt(value)) && !notes.includes(parseInt(value))){
            const newNotes = [...notes,parseInt(value)]
            setNotes(newNotes)
            sessionStorage.setItem(`${index}-Notes`, newNotes)
          }
      }  

    let numberButtons = document.querySelectorAll('.number-options')
    numberButtons.forEach(button=>{
    button.addEventListener('click', handleNote)
    })
    document.addEventListener("keydown", handleNote)

  return function cleanup(){
    let numberButtons = document.querySelectorAll('.number-options')
    numberButtons.forEach(button=>{
      button.removeEventListener('click', handleNote)
    })
    document.removeEventListener("keydown", handleNote)
  }

  }, [takeNotesTurnedOn, selectedSquare, index, hidden, setSelectedSquare, notes, chosenNumber])

  // After a pause, fetch the current game data from session storage and rehydrate
  useEffect(() => {
    if (!isPaused)  {
    const persistedNumber = sessionStorage.getItem(index)
    setChosenNumber(persistedNumber)}
    setSelectedSquare(null)
  }, [isPaused, index, boardConfig, setSelectedSquare])

  useEffect(()=>{
    const persistedNotes = !chosenNumber ? sessionStorage.getItem(`${index}-Notes`) : []
    if (persistedNotes) {
      setNotes(persistedNotes)
    }
  }, [index, isPaused, chosenNumber])


  return (
    <div 
      className={"square " + determineBorders(index)} 
      onClick={handleClick}
      onMouseOver={()=> {setIsHovered(true)}}
      onMouseLeave={()=> {setIsHovered(false)}}
      style={style} >
        {!hidden? number : chosenNumber}
        <Notes notes={notes} chosenNumber={chosenNumber} />
    </div> 
  )
}

export default Square

