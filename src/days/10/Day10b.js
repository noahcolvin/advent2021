import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day10b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  useEffect(() => {
    const isOpening = char => {
      if (char === '(' || char === '[' || char === '{' || char === '<')
        return true
      return false
    }

    const closes = (char, openChars) => {
      const lastChar = openChars[openChars.length - 1]
      switch (lastChar) {
        case '(':
          if (char === ')')
            return true
          return false
        case '[':
          if (char === ']')
            return true
          return false
        case '{':
          if (char === '}')
            return true
          return false
        case '<':
          if (char === '>')
            return true
          return false
        default:
          return false
      }
    }

    const cost = remaining => {
      let result = 0
      while (remaining.length > 0) {
        const left = remaining.pop()

        result = result * 5

        switch (left) {
          case '(':
            result += 1
            break
          case '[':
            result += 2
            break
          case '{':
            result += 3
            break
          case '<':
            result += 4
            break
          default:
            result += 0
        }
      }

      return result
    }

    const run = async () => {
      const data = await file.fetchDataForDay('10')

      const scores = []

      for (const line of data) {
        let opening = []

        for (const c of line) {
          if (isOpening(c)) {
            opening.push(c)
            continue
          }
          else if (closes(c, opening)) {
            opening.pop()
            continue
          }
          else {
            opening = []
            break
          }
        }

        if (opening.length > 0) {
          scores.push(cost(opening))
        }
      }

      const intSort = (a, b) => {
        if (a > b) return 1
        if (a < b) return -1
        return 0
      }
      scores.sort(intSort)

      return scores[parseInt(scores.length / 2)]
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 10b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 10b</h1>
    <p>{result}</p>
  </div>
}

export default Day10b