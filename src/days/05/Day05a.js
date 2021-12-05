import { useEffect, useState } from "react"

const Day05a = () => {
  const [result, setResult] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch('/Input/Input05.txt')
      const textData = await rawData.text()
      const splitData = textData.split('\n')
      return splitData
    }

    const findStraightLines = (lines) => {
      const verticalLines = []
      const horizontalLines = []

      for (const line of lines) {
        const set = line.split(' -> ')
        const start = set[0].split(',').map(s => parseInt(s))
        const end = set[1].split(',').map(e => parseInt(e))

        if (start[0] === end[0])
          verticalLines.push([start, end])
        if (start[1] === end[1])
          horizontalLines.push([start, end])
      }

      return { verticalLines, horizontalLines }
    }

    const run = async () => {
      const data = await fetchData()
      const { verticalLines, horizontalLines } = findStraightLines(data)
      const plottedPoints = new Map()

      for (const line of verticalLines) { // x same, y changes
        const firstPoint = line[0]
        const secondPoint = line[1]
        const start = firstPoint[1] < secondPoint[1] ? firstPoint : secondPoint
        const end = firstPoint[1] > secondPoint[1] ? firstPoint : secondPoint

        for (let y = start[1]; y <= end[1]; y++) {
          const stringPoint = `${start[0]},${y}`
          const existingValue = plottedPoints.get(stringPoint)
          if (existingValue)
            plottedPoints.set(stringPoint, existingValue + 1)
          else
            plottedPoints.set(stringPoint, 1)
        }
      }

      for (const line of horizontalLines) { // x changes, y same
        const firstPoint = line[0]
        const secondPoint = line[1]
        const start = firstPoint[0] < secondPoint[0] ? firstPoint : secondPoint
        const end = firstPoint[0] > secondPoint[0] ? firstPoint : secondPoint

        for (let x = start[0]; x <= end[0]; x++) {
          const stringPoint = `${x},${start[1]}`
          const existingValue = plottedPoints.get(stringPoint)
          if (existingValue)
            plottedPoints.set(stringPoint, existingValue + 1)
          else
            plottedPoints.set(stringPoint, 1)
        }
      }

      const values = [...plottedPoints.values()].filter(p => p > 1)

      return values.length
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 05a')
      })
      .catch(err => console.log(err.message))
  }, [])

  return <div>
    <h1>Day 05a</h1>
    <p>{result}</p>
  </div>
}

export default Day05a