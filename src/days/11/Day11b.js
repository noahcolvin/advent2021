import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day11b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const allZeros = cave => {
      for (let row = 0; row < cave.length; row++) {
        for (let col = 0; col < cave[row].length; col++) {
          if (cave[row][col] !== 0)
            return false
        }
      }
      return true
    }

    const findOverNine = cave => {
      for (let row = 0; row < cave.length; row++) {
        for (let col = 0; col < cave[row].length; col++) {
          if (cave[row][col] > 9)
            return [row, col]
        }
      }
      return null
    }

    const increment = (cave, row, col) => {
      if (row < 0 || row > cave.length - 1 || col < 0 || col > cave[row].length - 1 || cave[row][col] === 0)
        return //can't do these

      cave[row][col]++
    }

    const flash = (cave, row, col) => {
      cave[row][col] = 0

      increment(cave, row - 1, col - 1)
      increment(cave, row - 1, col)
      increment(cave, row - 1, col + 1)
      increment(cave, row, col - 1)
      increment(cave, row, col + 1)
      increment(cave, row + 1, col - 1)
      increment(cave, row + 1, col)
      increment(cave, row + 1, col + 1)
    }

    const run = async () => {
      const data = await file.fetchDataForDay('11')
      const cave = []
      for (const line of data) {
        cave.push(line.split('').map(l => parseInt(l)))
      }

      const steps = 1000

      for (let s = 0; s < steps; s++) {
        for (let row = 0; row < cave.length; row++) {
          for (let col = 0; col < cave[row].length; col++) {
            cave[row][col]++
          }
        }

        let overNine = findOverNine(cave)

        while (overNine) {
          flash(cave, overNine[0], overNine[1])
          overNine = findOverNine(cave)
        }

        if (allZeros(cave)) {
          return s + 1
        }
      }

      return -1
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 11b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 11b</h1>
    <p>{result}</p>
  </div>
}

export default Day11b