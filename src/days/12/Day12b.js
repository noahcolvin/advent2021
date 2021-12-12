import { useEffect, useState } from "react"
import useFile from '../../hooks/use-file'

const Day12b = () => {
  const [result, setResult] = useState()
  const file = useFile()

  const isLower = char => {
    return char === char.toLowerCase()
  }

  useEffect(() => {
    const anyTwice = (path) => {
      const caves = path.filter(p => p !== 'start' && p !== 'end')
      const smallPath = caves.filter(p => isLower(p))
      const set = new Set(smallPath)
      return [...set].length !== smallPath.length
    }

    const findPaths = (connections, start, totalPaths, currentPath) => {
      const movesTo = [...connections.get(start)]

      for (const move of movesTo) {
        const localPath = [...currentPath]

        if (move !== 'end' && start !== 'start' && isLower(move) && localPath.includes(move) && anyTwice(localPath))
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
            if (conn[i] === 'end' || conn[i === 0 ? 1 : 0] === 'start')
              continue
            existing.add(conn[i === 0 ? 1 : 0])
            continue
          }

          if (conn[i === 0 ? 1 : 0] === 'start')
            continue

          const set = new Set()
          if (conn[i] !== 'end' && conn[i === 0 ? 1 : 0] !== 'start')
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
        console.log('done 12b')
      })
      .catch(err => console.log(err.message))
  }, [file])

  return <div>
    <h1>Day 12b</h1>
    <p>{result}</p>
  </div>
}

export default Day12b