import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day08a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const run = async () => {
      const data = await file.fetchDataForDay('08')

      const knownDigits = [2, 4, 3, 7]
      let count = 0

      for (const line of data) {
        const output = line.split('|')[1]
        console.log(output)
        const digits = output.trim().split(' ').map(d => d.length)
        console.log(digits)

        for (const digit of digits) {
          if (knownDigits.includes(digit))
            count++
        }
      }

      return count
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 08a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 08a</h1>
    <p>{result}</p>
  </div>
}

export default Day08a