import './App.css'
import PreviousDays from './components/PreviousDays'
import Day01a from './days/01/Day01a'
import Day01b from './days/01/Day01b'
import Day02a from './days/02/Day02a'
import Day02b from './days/02/Day02b'
import Day03a from './days/03/Day03a'
import Day03b from './days/03/Day03b'
import Day04a from './days/04/Day04a'
import Day04b from './days/04/Day04b'
import Day05a from './days/05/Day05a'
import Day05b from './days/05/Day05b'
import Day06a from './days/06/Day06a'
import Day06b from './days/06/Day06b'
import Day07a from './days/07/Day07a'
import Day07b from './days/07/Day07b'
import Day08a from './days/08/Day08a'
import Day08b from './days/08/Day08b'
import Day09a from './days/09/Day09a'
import Day09b from './days/09/Day09b'

function App() {
  return (
    <div className="App">
      <PreviousDays>
        <Day01a />
        <Day01b />
        <Day02a />
        <Day02b />
        <Day03a />
        <Day03b />
        <Day04a />
        <Day04b />
        <Day05a />
        <Day05b />
        <Day06a />
        <Day06b />
        <Day07a />
        <Day07b />
        <Day08a />
        <Day08b />
      </PreviousDays>
      <Day09a />
      <Day09b />
    </div>
  )
}

export default App
