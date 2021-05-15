import React from 'react'

const Display = () => {
  return (
    <div id="display-screen">
    <div className="message-container">
      <h2 className='success-message'>You Win!</h2>
      <span id="finalTime">00:00</span>
      <input type="text" name="name" id="name" placeholder="Enter your name" />
    </div>
    <button className="reset-btn" id="resetBtn">Submit and Start Again</button>
    <div id="closeBtn">X</div>
  </div>
  )
}

export default Display
