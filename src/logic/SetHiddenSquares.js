import {WIDTH} from './CreateSodokuBoard'

/* eslint-disable */

export function setHiddenSquares(board, numberOfHiddenSquares) {
  const pickRandomSquare = (chosenIndexes) => {
    let randomSelection = Math.floor(Math.random() * WIDTH * WIDTH)
    if (!chosenIndexes.includes(randomSelection))  {
        return randomSelection
        } else {  
        return pickRandomSquare(chosenIndexes)
      }
  }

  const omitted = []


  for(let i=0; i<numberOfHiddenSquares; i++){
    omitted.push(pickRandomSquare(omitted))
  }
  
  return omitted
}

/* eslint-disable */



// export function setHiddenSquares(board, numberOfHiddenSquares) {
//   const omittedIndexes = []
//   omittedIndexes.push(Math.floor(Math.random() * WIDTH * WIDTH)) 


  
//   function findLegalSquare() {
//     let indexToCheck
//     while(!indexToCheck || omittedIndexes.includes(indexToCheck)){
//       indexToCheck = Math.floor(Math.random() * WIDTH * WIDTH)
//     }
//     const status = isLegal(indexToCheck)
//     return indexToCheck
//   }

//   function isLegal(index) {
//     // if this square was gone, would at least one other square have enough info to make a decision?
//     const hypotheticallyOmitted = [...omittedIndexes, index]
//     const boardWithOmitted = [...board].forEach((number,index) => { 
//       if(hypotheticallyOmitted.includes(index)){
//         boardWithOmitted[index] = undefined
//       }
//     })
//     let legalArray = []
//     boardWithOmitted.forEach((square, index)=>{
//       if(square === undefined) return;
//       let x = checkThisSquare(square, index, boardWithOmitted)
//       legalArray.push(x)
//     })








//     return true
//   }

//   function checkThisSquare(square, index, board) {
//     console.log(board[index])
//   }

//   for(let i = 1; i < numberOfHiddenSquares; i++) {
//     const legalSquare = findLegalSquare()
//     omittedIndexes.push(legalSquare)
//   }
//   console.log(omittedIndexes)
//   return omittedIndexes
// }




  /* 
  - pass in a gameboard and number of blanks to return 
  - select a random square
  - randomly choose another square and check:
    - can a decision be made now this square is gone?
    - a decision can be made when at least one visible square has 8 numbers accounted for by either its row, column or grid
    - if a decision can be made, choose that square and repeat, otherwise, call again
  */