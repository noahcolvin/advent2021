import { useEffect, useState } from "react"

const Day02b = () => {
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
  }, [])

  return <div>
    <h1>Day 02b</h1>
    <p>{result}</p>
  </div>
}

export default Day02b