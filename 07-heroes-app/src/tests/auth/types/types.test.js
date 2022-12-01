import { types } from "../../../auth/types/types"

describe('tests in types file', () => {
  it('should return the types:', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout'
    })
  })
})
