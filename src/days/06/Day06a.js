import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day06a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('06')
      const fish = data[0].split(',').map(f => parseInt(f))
      const days = 80

      for (let day = 0; day < days; day++) {
        for (let i = fish.length - 1; i >= 0; i--) {
          const timer = fish[i]

          if (timer === 0) {
            fish[i] = 6
            fish.push(8)
          }
          else
            fish[i]--
        }
      }

      return fish.length
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 06a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 06a</h1>
    <p>{result}</p>
  </div>
}

export default Day06a