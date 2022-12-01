import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CounterApp = ({ value }) => {
  const [count, setCount] = useState(value)

  const handleAdd = () => {
    setCount((c) => c + 1)
  }

  const handleRest = () => {
    setCount(count - 1)
  }

  return (
    <>
      <h1 data-testid="counterAppTitle">CounterApp</h1>
      <h2> {count} </h2>
      <button onClick={handleRest}>-1</button>
      <button aria-label="btn-reset" onClick={() => setCount(value)}>Reset</button>
      <button onClick={handleAdd}>+1</button>
    </>
  )
}

CounterApp.propTypes = {
  value: PropTypes.number
}

CounterApp.defaultProps = {
  value: 0
}

export default CounterApp
