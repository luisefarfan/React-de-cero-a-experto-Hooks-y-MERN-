import { types } from '../types/types'

export const authReducer = (state, action) => {
  switch (action.type) {
    case types.login:
      return {
        // Por si se agregan mas propiedades al estado
        ...state,
        logged: true,
        user: action.payload
      }
    case types.logout:
      return {
        ...state,
        logged: false,
        user: null
      }
    default:
      return state
  }
}
