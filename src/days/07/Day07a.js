import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day07a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('07')
      const crabs = data[0].split(',').map(f => parseInt(f))

      const highestPosition = Math.max(...crabs)
      let fuel = undefined

      for (let position = 0; position <= highestPosition; position++) {
        let total = 0

        for (let y = 0; y < crabs.length; y++) {
          total += Math.abs(crabs[y] - position)
        }

        if (!fuel || total < fuel)
          fuel = total
      }

      return fuel
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 07a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 07a</h1>
    <p>{result}</p>
  </div>
}

export default Day07a