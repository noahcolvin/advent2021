import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day06b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const distribute = fish => {
      const fishies = new Map()

      for (let x = 0; x < fish.length; x++) {
        const current = fish[x]
        const existing = fishies.get(current)
        if (existing)
          fishies.set(current, existing + 1)
        else
          fishies.set(current, 1)
      }

      return fishies
    }

    const run = async () => {
      const data = await file.fetchDataForDay('06')
      const fish = data[0].split(',').map(f => parseInt(f))
      const days = 256
      const counts = distribute(fish)

      for (let day = 0; day < days; day++) {
        const toRespawn = counts.get(0) ?? 0
        counts.set(0, counts.get(1) ?? 0)
        counts.set(1, counts.get(2) ?? 0)
        counts.set(2, counts.get(3) ?? 0)
        counts.set(3, counts.get(4) ?? 0)
        counts.set(4, counts.get(5) ?? 0)
        counts.set(5, counts.get(6) ?? 0)
        counts.set(6, (counts.get(7) ?? 0) + toRespawn)
        counts.set(7, counts.get(8) ?? 0)
        counts.set(8, toRespawn)
      }

      const countValues = [...counts.values()]
      const reducer = (a, b) => a + b

      return countValues.reduce(reducer)
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 06b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 06b</h1>
    <p>{result}</p>
  </div>
}

export default Day06b