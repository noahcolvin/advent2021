import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day12a = () => {
  const [result, setResult] = useState()
  const file = useFile()

  const isLower = char => {
    return char === char.toLowerCase()
  }

  useEffect(() => {
    const findPaths = (connections, start, totalPaths, currentPath) => {
      const movesTo = [...connections.get(start)]

      for (const move of movesTo) {
        const localPath = [...currentPath]

        if (move !== 'end' && start !== 'start' && isLower(move) && localPath.includes(move))
          continue

        localPath.push(move)

        if (move === 'end') {
          totalPaths.push(localPath)
          continue
        }

        findPaths(connections, move, totalPaths, localPath)
      }
    }

    const run = async () => {
      const data = await file.fetchDataForDay('12')
      const connections = []
      for (const line of data) {
        connections.push(line.split('-'))
      }

      const possibleConnections = new Map()
      for (const conn of connections) {
        for (let i = 0; i <= 1; i++) {
          const existing = possibleConnections.get(conn[i])
          if (existing) {
            if (conn[i] === 'end')
              continue
            existing.add(conn[i === 0 ? 1 : 0])
            continue
          }

          if (conn[i === 0 ? 1 : 0] === 'start')
            continue

          const set = new Set()
          if (conn[i] !== 'end')
            set.add(conn[i === 0 ? 1 : 0])
          possibleConnections.set(conn[i], set)
        }
      }

      const totalPaths = []
      findPaths(possibleConnections, 'start', totalPaths, ['start'])

      return totalPaths.length
    }

    run()
      .then(res => {
        setResult(res)
        console.log('done 12a')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 12a</h1>
    <p>{result}</p>
  </div>
}

export default Day12a