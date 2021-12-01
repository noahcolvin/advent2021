import { useEffect, useState } from "react"

const Day01a = () => {
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
      debugger
      for (let x = 0; x < data.length; x++) {
        const value = parseInt(data[x])
        if (x > 0 && value > last)
          count++
        last = value
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
    <h1>Day 01a</h1>
    <p>{result}</p>
  </div>
}

export default Day01a