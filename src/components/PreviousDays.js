import { useState } from "react"

const PreviousDays = props => {
  const [viewPrevious, setViewPrevious] = useState(false)

  const togglePreviousHandler = () => {
    setViewPrevious(previous => !previous)
  }

  return (
    <div>
      <button onClick={togglePreviousHandler}>{viewPrevious ? 'Hide': 'Show'} Previous Days</button>
      {viewPrevious && props.children}
    </div>
  )
}

export default PreviousDays