const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let newValue = 0
  switch (action.type) {
    case 'GOOD':
      newValue = state.good + 1
      return {...state, good: newValue}
    case 'OK':
      newValue = state.ok + 1
      return {...state, ok: newValue }
    case 'BAD':
      newValue = state.bad + 1
      return {...state, bad: newValue }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer