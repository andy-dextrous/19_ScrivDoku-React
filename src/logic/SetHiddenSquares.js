import {WIDTH} from './CreateSodokuBoard'

export function setHiddenSquares(numberOfHiddenSquares) {
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