import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day13a = () => {
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

      for (let i = 0; i < 1; i++) {
        if (instructions[i][0] === 'x')
          foldHorizontal(grid, instructions[i][1])
        else
          foldVertical(grid, instructions[i][1])
      }

      const strings = grid.map(g => g.join(','))
      const set = new Set(strings)

      return [...set].length
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 13a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 13a</h1>
    <p>{result}</p>
  </div>
}

export default Day13a