import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day09a = () => {
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

    const run = async () => {
      const data = await file.fetchDataForDay('09')

      let grid = []
      for (const line of data) {
        const column = line.split('').map(i => parseInt(i))
        grid.push(column)
      }

      let lowSum = 0
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
          if (pointLowest(grid, row, column)) {
            lowSum += grid[row][column] + 1
          }
        }
      }

      return lowSum
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 09a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 09a</h1>
    <p>{result}</p>
  </div>
}

export default Day09a