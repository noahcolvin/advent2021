import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day01a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('01')

      let last = 0
      let count = 0
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
        console.log('done 01a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 01a</h1>
    <p>{result}</p>
  </div>
}

export default Day01a