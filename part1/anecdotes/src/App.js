import { useState } from 'react'

const Heading = ({ text }) => <h3>{text}</h3>
const Display = ({ anecdotes, votes, index }) => {
  return (
    <>
      <div>
        {anecdotes[index]}
        <p>has {votes[index]} votes</p>
      </div>
    </>
  )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const min = 0 // represents the index 0 of the anecdotes array
  const max = anecdotes.length - 1 // 7 - which represents the last index of the anecdotes array
  const maxVotesIndex = votes.indexOf(Math.max(...votes))

  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min) // this generates the range between 0 and (max-min+1) and min is then added to shift the range from min to max
    setSelected(randomNumber)

  }

  const handleVote = () => {
    const copiedArray = [...votes]
    copiedArray[selected] += 1
    setVotes(copiedArray)
  }

  return (
    <>
      <Heading text="anecdote of the day" />
      <Display anecdotes={anecdotes} votes={votes} index={selected} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
      <Heading text="anecdote with the most votes" />
      <Display anecdotes={anecdotes} votes={votes} index={maxVotesIndex} />
    </>
  )
}

export default App