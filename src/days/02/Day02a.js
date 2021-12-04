import { useEffect, useState } from "react"

const Day02a = () => {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch('/Input/Input02.txt')
      const textData = await rawData.text()
      const splitData = textData.split('\n')
      return splitData
    }

    const run = async () => {
      const data = await fetchData()

      let depth = 0
      let forward = 0

      for (let x = 0; x < data.length; x++) {
        const splitData = data[x].split(' ')
        const direction = splitData[0]
        const value = parseInt(splitData[1])

        switch (direction) {
          case 'forward':
            forward += value
            break
          case 'up':
            depth -= value
            break
          case 'down':
            depth += value
            break
          default:
            break
        }

      }
      return forward * depth
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 02a')
      })
      .catch(err => console.log(err.message))
  }, [])

  return <div>
    <h1>Day 02a</h1>
    <p>{result}</p>
  </div>
}

export default Day02a