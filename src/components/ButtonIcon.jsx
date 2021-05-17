import React from 'react'

const ButtonIcon = ({type}) => {
  
    if (type==="difficulty" || !type){
    return <svg style={{height:"30px", marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
      <g fill="none" fillRule="evenodd"><path fill="none" d="M0 0H25V25H0z"></path><path fill="#0072E3" d="M20 2c1.657 0 3 1.343 3 3v15c0 1.657-1.343 3-3 3H5c-1.657 0-3-1.343-3-3V5c0-1.657 1.343-3 3-3h15zM8.999 16H4v4c0 .552.448 1 1 1h3.999v-5zm6 0h-5v5h5v-5zM21 16h-5.001v5H20c.552 0 1-.448 1-1v-4zM8.999 10H4v5h4.999v-5zm6 0h-5v5h5v-5zM21 10h-5.001v5H21v-5zm-2.498 1.587c.552 0 1 .448 1 1 0 .553-.448 1-1 1-.553 0-1-.447-1-1 0-.552.447-1 1-1zM8.999 4H5c-.552 0-1 .448-1 1v4h4.999V4zm6 0h-5v5h5V4zM20 4h-4.001v5H21V5c0-.552-.448-1-1-1zM6.5 5.5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path></g>
    </svg> 
    } else if (type==="restart") {
      return <svg  style={{height:"30px", marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 31">
      <g fill="none" fillRule="evenodd"><path fill="#0072E3" d="M9.71 2.864c.374.346.425.911.136 1.316l-.08.097L7.62 6.603l3.412.018c5.522 0 10 4.478 10 10 0 5.523-4.478 10-10 10-5.523 0-10-4.477-10-10 0-.552.447-1 1-1 .552 0 1 .448 1 1 0 4.419 3.581 8 8 8 4.418 0 8-3.581 8-8 0-4.335-3.448-7.864-7.756-7.996l-.25-.004-3.476-.018 2.276 2.526c.341.379.34.947.014 1.323l-.088.09c-.379.34-.947.339-1.322.014l-.09-.088L4.578 8.29c-.317-.352-.34-.872-.072-1.249l.08-.099 3.71-4.022c.375-.406 1.008-.432 1.414-.057z" transform="translate(4 -.4)"></path><path fill="#D8D8D8" d="M8.55 0L1.347 8l7.201-8z" transform="matrix(0 1 1 0 5 -1.3)"></path></g></svg>
    }
  
}

export default ButtonIcon
