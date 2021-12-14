import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day13b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  const foldHorizontal = (grid, line) => {
    for (const row of grid) {
      if (row[0] > line) {
        const difference = row[0] - line
        row[0] = row[0] - difference * 2
      }
    }
  }

  const foldVertical = (grid, line) => {
    for (const row of grid) {
      if (row[1] > line) {
        const difference = row[1] - line
        row[1] = row[1] - difference * 2
      }
    }
  }

  const intSort = (a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  }

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('13')
      const grid = []
      const instructions = []
      for (const line of data) {
        if (line === '')
          continue
        else if (line.startsWith('fold along'))
          instructions.push(line.replace('fold along ', '').split('='))
        else
          grid.push(line.split(',').map(l => parseInt(l)))
      }

      for (let i = 0; i < instructions.length; i++) {
        if (instructions[i][0] === 'x')
          foldHorizontal(grid, instructions[i][1])
        else
          foldVertical(grid, instructions[i][1])
      }

      const map = new Map()

      for (const point of grid) {
        const existing = map.get(point[0])
        if (existing)
          map.set(point[0], existing.add(point[1]))
        else {
          map.set(point[0], new Set([point[1]]))
        }
      }

      const keys = [...map.keys()].sort(intSort)

      let resultString = ''
      for (let x = 0; x < Math.max(...keys) + 1; x++) {
        const colsInRow = map.get(x)

        if (colsInRow) {
          const cols = [...colsInRow].sort(intSort)

          for (let y = 0; y < Math.max(...cols) + 1; y++) {
            if (cols.includes(y))
              resultString += '#'
            else
              resultString += ' '
          }
        }
        else
          resultString += '______'

        resultString += '\n'
      }

      return resultString
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 13b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 13b</h1>
    <pre>{result}</pre>
  </div>
}

export default Day13b