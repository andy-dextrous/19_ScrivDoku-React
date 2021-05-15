export const WIDTH = 9

export function createSodokuBoard() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const thisRow = []
  const board = []
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

  const init = () => {
    board.push(...shuffle(numbers))
    for (let i = 1; i < WIDTH; i++) {
      thisRow.length = 0
      let row = createRow()
      board.push(...row)
    }
    console.log(board.length)
    return board
  }

  let i = 0

  function createRow() {
    const newRow = [...numbers].sort()
    const calculatedRow = selectNextNumber(newRow)
    if (calculatedRow.length < WIDTH && i < 19) {
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
    const legalNumbers = arr.filter((number, index) => {
      const allNumbersAbove = []
      const sameSquareNumbers = []
      // Check numbers above
      for (let i = currentNumberIndex; i >= 0; i -= WIDTH) {
        if (board[i] !== undefined) allNumbersAbove.push(board[i])
      }
      // Check numbers in same square
      numberSquareIndexes.forEach((square, index) => {
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
      // Now pass the same row back into the same function minus the chosen number
      selectNextNumber(arr)
    } else {
      // Unless we are at the end of the row
      return
    }

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
    init()
  }
}