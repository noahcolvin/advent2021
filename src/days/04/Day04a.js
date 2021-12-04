import { useEffect, useState } from "react"

const Day04a = () => {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch('/Input/Input04.txt')
      const textData = await rawData.text()
      const splitData = textData.split('\n')
      return splitData
    }

    const getBoards = data => {
      const boards = []

      let currentBoard = []
      for (const line of data) {
        if (line.includes(',') || line === '')
          continue

        currentBoard.push(line.trim().split(/\s+/))

        if (currentBoard.length === 5) {
          boards.push(currentBoard)
          currentBoard = []
        }
      }

      return boards
    }

    const checkBoard = (board, called) => {
      if (called.length < 5)
        return false

      let found = 0
      for (let y = 0; y < 5; y++) { //each horizontal line
        for (let x = 0; x < 5; x++) { //each number in line
          if (!called.includes(board[y][x]))
            break //go to next line
          found++
        }

        if (found === 5)
          return true
        else
          found = 0
      }

      if (found > 0)
        console.log('found bad');

      for (let y = 0; y < 5; y++) { //each horizontal line
        for (let x = 0; x < 5; x++) { //each number in line
          if (!called.includes(board[x][y]))
            break //go to next line
          found++
        }

        if (found === 5)
          return true
        else
          found = 0
      }

      return found === 5
    }

    const sumUncalledNumbers = (board, called) => {
      let sum = 0

      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          const value = board[x][y]
          if (!called.includes(value))
            sum += parseInt(value)
        }
      }

      return sum
    }

    const run = async () => {
      const data = await fetchData()
      const drawn = data[0].split(',')
      const boards = getBoards(data)

      const called = []
      for (const num of drawn) {
        called.push(num)

        for (const board of boards) {
          const boardWon = checkBoard(board, called)
          if (boardWon)
            return parseInt(num) * sumUncalledNumbers(board, called)
        }
      }

      return 0
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 04a')
      })
      .catch(err => console.log(err.message))
  }, [])

  return <div>
    <h1>Day 04a</h1>
    <p>{result}</p>
  </div>
}

export default Day04a