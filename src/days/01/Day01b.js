import { useEffect, useState } from "react"

const Day01b = () => {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch('/Input/Input01a.txt')
      const textData = await rawData.text()
      const splitData = textData.split('\n')
      return splitData
    }

    const run = async () => {
      const data = await fetchData()

      let last = 0
      let count = 0
      for (let x = 0; x < data.length; x++) {
        const value1 = parseInt(data[x])
        const value2 = parseInt(data[x + 1])
        const value3 = parseInt(data[x + 2])
        const sum = value1 + value2 + value3

        if (isNaN(sum))
          break

        if (x > 0 && sum > last)
          count++
        last = sum
      }
      return count
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done')
      })
      .catch(err => console.log(err.message))
  }, [])

  return <div>
    <h1>Day 01b</h1>
    <p>{result}</p>
  </div>
}

export default Day01b