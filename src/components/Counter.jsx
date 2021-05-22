import React, {useContext, useState, useEffect, useRef} from 'react'
import {boardContext} from '../App'
import { FaPause } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';

const Counter = ({difficulty, setIsPaused, isPaused}) => {
  const boardConfig = useContext(boardContext)
  const [timer,setTimer] = useState("00:00")
  const pausedValue = useRef(0)
  const pausedSeconds = useRef(0)

  useEffect(() => {
    if(isPaused) return;
    let timerId
    startTimer()
    
    function startTimer() {
  
      let startTime = new Date()
      timerId = setInterval(() => {
        let newTime = new Date()
        let elapsed = newTime - startTime
        let seconds = Math.floor(elapsed / 1000 + pausedSeconds.current)
        let minutes = Math.floor(seconds / 60)
        const display = (minutes < 10 ? "0" + minutes : minutes) + ":" + ((seconds - minutes * 60) < 10 ? "0" + (seconds - minutes * 60).toString() : (seconds - minutes * 60).toString())
        setTimer(display)
        pausedValue.current = display
      }, 
      50)
    }

    return () => {
        clearInterval(timerId)
      }
  
}, [boardConfig, pausedValue, isPaused])

useEffect(()=>{
  pausedSeconds.current = 0
}, [boardConfig])

function getSeconds(timeString) {
  const minutes = parseInt(timeString.current.split(':')[0])
  const seconds = parseInt(timeString.current.split(':')[1])
  const total = minutes * 60 + seconds
  return total
}

function pausePlay() {
  const secondsElapsed = getSeconds(pausedValue)
  pausedSeconds.current = secondsElapsed
  setIsPaused(!isPaused)
}

function unPause() {
  setIsPaused(!isPaused); 
}


  return (
    <div className="count" id="count">
      <div id="timer" className="timerDisplay">{!isPaused?timer:pausedValue.current}
      { !isPaused ?
      <FaPause style={{padding:'5px', marginLeft:'5px', border:'2px solid #555', borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer'}}
                onClick={pausePlay}/>
      :
      <FaPlay style={{padding:'5px', marginLeft:'5px', border:'2px solid #555', borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer'}}
                      onClick={unPause}
      />
}

      </div>
      <div className="difficulty-display"><span>You are playing</span><h3>{difficulty} Mode</h3></div>
    </div>
  )
}

export default Counter
