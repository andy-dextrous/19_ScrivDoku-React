export const WIDTH = 9
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const numberSquareIndexes = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80]
]
// Pass a place on the board, the current configuration and the number you want to check. Returns a boolean
export const isLegalNumber = ( index, board, number ) => {
    const allNumbersAbove = []
    const allNumbersBelow = []
    const sameRowNumbers = []
    const sameSquareNumbers = []
    const allVisibleNumberIndexes = []
    const hiddenSquares = Array.from((document.querySelectorAll('.square')))
    hiddenSquares.map((square)=>{
      return square.innerText !== ''})
      .forEach((value, index)=>{
        value && allVisibleNumberIndexes.push(index)
      })

    // Check numbers above
    for (let i = index-WIDTH; i >= 0; i -= WIDTH) {
      if (board[i] !== undefined && allVisibleNumberIndexes.includes(i)) allNumbersAbove.push(board[i])
    }
    // Check numbers below
    for (let i = index+WIDTH; i <= WIDTH * WIDTH; i += WIDTH) {
      if (board[i] !== undefined && allVisibleNumberIndexes.includes(i)) allNumbersBelow.push(board[i])
    }
    // Check numbers in same row
    const rowNumber = Math.floor(index / WIDTH)
    for (let i = 0; i < WIDTH; i ++) {
      let targetIndex = rowNumber * WIDTH + i
      if(allVisibleNumberIndexes.includes(targetIndex)) {
        sameRowNumbers.push(board[targetIndex])
    }
    }
    // Check numbers in same square
    numberSquareIndexes.forEach(numberSquare => {
      if (numberSquare.includes(index)) {
        numberSquare.forEach((position) => {
          if(allVisibleNumberIndexes.includes(position)) {
          sameSquareNumbers.push(board[position]) }
        })
      }
    })

    const legal = (allNumbersBelow.includes(number) || allNumbersAbove.includes(number) || sameSquareNumbers.includes(number) || sameRowNumbers.includes(number))

    return !legal
}

export function createSodokuBoard() {
  const MAXIMUM_ATTEMPTS = 1000
  let i = 0
  const thisRow = []
  const board = []

  const init = () => {
    // Resets in case of recursive call
    board.length = 0
    thisRow.length = 0
    // Start with a random first row
    board.push(...shuffle(numbers))
    // For the remaining rows, create them one at a time
    for (let i = 1; i < WIDTH; i++) {
      thisRow.length = 0
      let row = createRow()
      board.push(...row)
    }
    return board
  }

  function createRow() {
    const newRow = [...numbers].sort()
    const calculatedRow = selectNextNumber(newRow)

    // Sometimes the first part of a board is created in such a way that it doesn't make a sudoku combo possible. In this case, we run the whole thing again recursively. Otherwise we exceed max call stack. If we reach the maximum attempts then the board returns a short number and the whole thing is called again. 
    if (calculatedRow.length < WIDTH && i < MAXIMUM_ATTEMPTS) {
      i++
      thisRow.length = 0
      createRow()
    } else {
      return calculatedRow
    }
    return calculatedRow
  }

  function selectNextNumber(arr) {
    const currentNumberIndex = board.length + WIDTH - arr.length
    const legalNumbers = arr.filter(number => {
      const allNumbersAbove = []
      const sameSquareNumbers = []
      // Check numbers above
      for (let i = currentNumberIndex; i >= 0; i -= WIDTH) {
        if (board[i] !== undefined) allNumbersAbove.push(board[i])
      }
      // Check numbers in same square
      numberSquareIndexes.forEach(square => {
        if (square.includes(currentNumberIndex)) {
          square.forEach(position => {
            sameSquareNumbers.push(board[position])
          })
        }
      })

      // Return all legal numbers
      return (!allNumbersAbove.includes(number) && !sameSquareNumbers.includes(number))
    })

    // Choose a number from available options
    let newNumber = shuffle(legalNumbers).shift()
    // Get its index in order to splice it out of array
    let X = arr.indexOf(newNumber)

    if (newNumber !== undefined) {
      thisRow.push(newNumber)
    }

    arr.splice(X, 1)
    if (arr.length > 0) {
      // Now pass the current row back into the same function minus the chosen number
      selectNextNumber(arr)
    } 
      // Unless we are at the end of the row
 
    return thisRow
  }

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  init()

  if (board.length === WIDTH * WIDTH) {
    return board
  } else {
    return init()
  }
}