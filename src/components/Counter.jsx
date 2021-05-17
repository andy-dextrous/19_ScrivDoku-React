import React, {useContext, useState, useEffect} from 'react'
import {boardContext} from '../App'

const Counter = () => {
  const boardConfig = useContext(boardContext)
  const [timer,setTimer] = useState(0)
  let timerId

  function startTimer() {
  
    let startTime = new Date()
    timerId = setInterval(() => {
      let newTime = new Date()
      let elapsed = newTime - startTime
      let seconds = Math.floor(elapsed / 1000)
      let minutes = Math.floor(seconds / 60)
      const display = (minutes < 10 ? "0" + minutes : minutes) + ":" + ((seconds - minutes * 60) < 10 ? "0" + (seconds - minutes * 60).toString() : (seconds - minutes * 60).toString())
      setTimer(display)
    }, 
    50)
  }

  useEffect(() => {
    startTimer()
    return () => {
        clearInterval(timerId)
      }
  
}, [boardConfig])

  return (
    <div className="count" id="count">{timer}</div>
  )
}

export default Counter
