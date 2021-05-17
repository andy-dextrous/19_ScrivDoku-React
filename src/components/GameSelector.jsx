import React from 'react'
import ButtonIcon from './ButtonIcon'


const Game_Selector = (props) => {
  const dropDownStyle = {position:"absolute", boxShadow:"0 5px 20px 0 rgb(0 0 0 / 20%)", width:'90%', backgroundColor:"#FFF", textAlign:"center", top:"190px", left:"5%", padding:" 3% 3% 10%",zIndex:"10", boxSizing:"border-box"}
  const buttonStyle = {display:"flex", width:"100%", backgroundColor:"#f3f6fa", border:"1px solid #efefef", borderRadius:"5px", fontSize:"16px", justifyContent:"start", alignItems:"center", cursor:"pointer"}

  const {startNewGame, setDifficulty, setIsNewGameButtonClick, isNewGameButtonClick} = props

  function init(difficulty) {
    startNewGame()
    setDifficulty(difficulty)
    setIsNewGameButtonClick(!isNewGameButtonClick)
  }


  return (
    <div style={dropDownStyle}>
      <div>
        <h3>Select Difficulty</h3>
      </div>
      <div>
        <button style={buttonStyle} onClick={()=>{init("easy")}}> <ButtonIcon type={"difficulty"} />Easy</button>
        <button style={buttonStyle} onClick={()=>{init("medium")}}> <ButtonIcon type={"difficulty"} />Medium</button>
        <button style={buttonStyle} onClick={()=>{init("hard")}}> <ButtonIcon type={"difficulty"} />Hard</button>
        <button style={buttonStyle}> <ButtonIcon type={"restart"}/>Restart</button>
  
      </div>
    </div>
  )
}

export default Game_Selector
