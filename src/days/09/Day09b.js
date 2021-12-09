import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day09b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const pointLowest = (grid, row, column) => {
      const current = grid[row][column]

      //left
      if (column - 1 >= 0 && current >= grid[row][column - 1])
        return false
      //right
      if (column + 1 < grid[row].length && current >= grid[row][column + 1])
        return false
      //above
      if (row - 1 >= 0 && current >= grid[row - 1][column])
        return false
      //below
      if (row + 1 < grid.length && current >= grid[row + 1][column])
        return false

      return true
    }

    const findThings = (grid, set, row, column) => {
      set.add(`${row},${column}`)

      if (column + 1 < grid[row].length && grid[row][column + 1] !== 9 && !set.has(`${row},${column + 1}`)) { //move right
        findThings(grid, set, row, column + 1)
      }
      if (column - 1 >= 0 && grid[row][column - 1] !== 9 && !set.has(`${row},${column - 1}`)) { //move left
        findThings(grid, set, row, column - 1)
      }
      if (row + 1 < grid.length && grid[row + 1][column] !== 9 && !set.has(`${row + 1},${column}`)) { //move up
        findThings(grid, set, row + 1, column)
      }
      if (row - 1 >= 0 && grid[row - 1][column] !== 9 && !set.has(`${row - 1},${column}`)) { //move down
        findThings(grid, set, row - 1, column)
      }
    }

    const run = async () => {
      const data = await file.fetchDataForDay('09')

      let grid = []
      for (const line of data) {
        const column = line.split('').map(i => parseInt(i))
        grid.push(column)
      }

      const lowPoints = []
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
          if (pointLowest(grid, row, column)) {
            lowPoints.push([row, column])
          }
        }
      }

      const setCounts = []
      for (const lowPoint of lowPoints) {
        const set = new Set()
        findThings(grid, set, lowPoint[0], lowPoint[1])
        setCounts.push([...set].length)
      }

      const intSort = (a, b) => {
        if (a > b) return -1
        if (a < b) return 1
        return 0
      }
      setCounts.sort(intSort)

      return setCounts[0] * setCounts[1] * setCounts[2]
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 09b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 09b</h1>
    <p>{result}</p>
  </div>
}

export default Day09b