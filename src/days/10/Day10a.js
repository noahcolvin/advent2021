import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day10a = () => {
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

    const cost = corrupt => {
      let result = 0
      for (const bad of corrupt) {
        switch (bad) {
          case ')':
            result += 3
            break
          case ']':
            result += 57
            break
          case '}':
            result += 1197
            break
          case '>':
            result += 25137
            break
          default:
            result += 0
        }
      }
      return result
    }

    const run = async () => {
      const data = await file.fetchDataForDay('10')

      const corrupt = []
      for (const line of data) {
        const opening = []
        for (const c of line) {
          if (isOpening(c)) {
            opening.push(c)
          }
          else if (closes(c, opening)) {
            opening.pop()
          }
          else {
            corrupt.push(c)
            break
          }
        }
      }

      return cost(corrupt)
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 10a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 10a</h1>
    <p>{result}</p>
  </div>
}

export default Day10a