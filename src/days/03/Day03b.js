import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day03b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('03')

      let o2 = [...data]
      let co2 = [...data]

      for (let i = 0; i < data[0].length; i++) {
        if (o2.length > 1) {
          const o2ZeroCount = o2.filter(d => d[i] === '0').length
          const o2ZeroMostCommon = o2ZeroCount === o2.length / 2 ? false : o2ZeroCount > o2.length / 2

          o2 = o2.filter(o => o2ZeroMostCommon ? o[i] === '0' : o[i] === '1')
        }

        if (co2.length > 1) {
          const co2ZeroCount = co2.filter(d => d[i] === '0').length
          const co2ZeroMostCommon = co2ZeroCount === co2.length / 2 ? false : co2ZeroCount > co2.length / 2

          co2 = co2.filter(o => co2ZeroMostCommon ? o[i] === '1' : o[i] === '0')
        }
      }

      return parseInt(o2[0], 2) * parseInt(co2[0], 2)
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 03b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 03b</h1>
    <p>{result}</p>
  </div>
}

export default Day03b