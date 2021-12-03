import { useEffect, useState } from "react"

const Day03a = () => {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch('/Input/Input03.txt')
      const textData = await rawData.text()
      const splitData = textData.split('\n')
      return splitData
    }

    const run = async () => {
      const data = await fetchData()

      let gamma = ''
      let epsilon = ''

      for (let i = 0; i < data[0].length; i++) {
        const zeroMostCommon = data.filter(d => d[i] === '0').length > data.length / 2
        gamma += zeroMostCommon ? '0' : '1'
        epsilon += zeroMostCommon ? '1' : '0'
      }

      return parseInt(gamma, 2) * parseInt(epsilon, 2)
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 03a')
      })
      .catch(err => console.log(err.message))
  }, [])

  return <div>
    <h1>Day 03a</h1>
    <p>{result}</p>
  </div>
}

export default Day03a