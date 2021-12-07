import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day02b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('02')

      let depth = 0
      let position = 0
      let aim = 0

      for (let x = 0; x < data.length; x++) {
        const splitData = data[x].split(' ')
        const direction = splitData[0]
        const value = parseInt(splitData[1])

        switch (direction) {
          case 'forward':
            position += value
            depth += aim * value
            break
          case 'up':
            aim -= value
            break
          case 'down':
            aim += value
            break
          default:
            break
        }

      }
      return position * depth
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 02a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 02b</h1>
    <p>{result}</p>
  </div>
}

export default Day02b