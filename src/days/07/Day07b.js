import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day07b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const countBetween = (one, two) => {
      const min = Math.min(one, two)
      const max = Math.max(one, two)
      const total = ((max - min) + 1) * (min + max) / 2
      return total
    }

    const run = async () => {
      const data = await file.fetchDataForDay('07')
      const crabs = data[0].split(',').map(f => parseInt(f))

      const highestPosition = Math.max(...crabs)
      let fuel = undefined

      for (let position = 5; position <= highestPosition; position++) {
        let total = 0

        for (let y = 0; y < crabs.length; y++) {
          const diff = Math.abs(crabs[y] - position)
          total += countBetween(0, diff)
        }

        if (!fuel || total < fuel)
          fuel = total
      }

      return fuel
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 07b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 07b</h1>
    <p>{result}</p>
  </div>
}

export default Day07b