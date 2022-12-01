import { authReducer } from "../../../auth/context/authReducer"
import { types } from "../../../auth/types/types"

describe('tests in authReducer', () => {
  const initialState = {
    logged: false,
    user: null
  }

  it('should return the default state', () => {
    const state = authReducer(initialState, {})

    expect(state).toEqual(initialState)
  })

  it('should login. Adds the user and logged = true', () => {
    const newLoginUser = { name: 'Enrique', email: 'enrique@correo.com' }
    const state = authReducer(initialState, { type: types.login, payload: newLoginUser })

    expect(state.logged).toBeTruthy()
    expect(state.user).toEqual(newLoginUser)
  })

  it('should logout. Delete the user and logged = false', () => {
    const loginUser = { name: 'Enrique', email: 'enrique@correo.com' }
    const state = authReducer({ logged: true, user: loginUser }, { type: types.logout })

    expect(state.logged).toBeFalsy()
    expect(state.user).toBe(null)
  })
})
