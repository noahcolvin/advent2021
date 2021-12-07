import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day03a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('03')

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
  }, [file])

  return <div>
    <h1>Day 03a</h1>
    <p>{result}</p>
  </div>
}

export default Day03a