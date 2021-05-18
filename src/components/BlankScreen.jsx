import React from 'react'
import { FaPlay } from 'react-icons/fa';

const BlankScreen = ({isPaused, setIsPaused}) => {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:'100%', height:"100%"}}>
      <FaPlay style={{width:"100px", height:'100px', color:"#69A7F0", cursor:"pointer"}}
              onClick={()=>setIsPaused(!isPaused)}
      />
    </div>
  )
}

export default BlankScreen
