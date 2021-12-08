import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day08b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const stringContains = (source, find) => {
      const sourceArr = source.split('')
      const findArr = find.split('')

      return findArr.every(ai => sourceArr.includes(ai))
    }

    const matchCount = (big, small) => {
      let count = 0
      for (const b of big) {
        if (small.includes(b))
          count++
      }

      return count
    }

    const getKeyByValue = (object, value) => {
      return Object.keys(object).find(key => object[key] === value)
    }

    const run = async () => {
      const data = await file.fetchDataForDay('08')

      let result = 0

      for (const line of data) {
        const input = line.split('|')[0].trim().split(' ').map(i => i.split('').sort().join(''))
        const output = line.split('|')[1].trim().split(' ').map(o => o.split('').sort().join(''))
        const numbers = {
          1: input.find(i => i.length === 2),
          4: input.find(i => i.length === 4),
          7: input.find(i => i.length === 3),
          8: input.find(i => i.length === 7)
        }

        const nums2_3_5 = input.filter(i => i.length === 5)
        const nums0_6_9 = input.filter(i => i.length === 6)

        numbers[3] = nums2_3_5.find(i => stringContains(i, numbers[1]))
        numbers[6] = nums0_6_9.find(i => !stringContains(i, numbers[1]))
        numbers[5] = nums2_3_5.find(i => matchCount(numbers[6], i) === 5)
        numbers[2] = nums2_3_5.find(i => i !== numbers[3] && i !== numbers[5])

        const nums1_5 = [...new Set((numbers[1] + numbers[5]).split(''))].sort()
        numbers[9] = nums0_6_9.find(i => i === nums1_5.join(''))
        numbers[0] = nums0_6_9.find(i => i !== numbers[6] && i !== numbers[9])

        let value = ''
        for (const o of output) {
          value += getKeyByValue(numbers, o).toString()
        }

        result += parseInt(value)
      }

      return result
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 08b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 08b</h1>
    <p>{result}</p>
  </div>
}

export default Day08b