import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from "../../auth"
import { PrivateRoute } from "../../router/PrivateRoute"

describe('tests in <PrivateRoute/>', () => {
  it('should show the children if the user is authenticated', () => {
    Storage.prototype.setItem = jest.fn()

    render(
      <AuthContext.Provider value={{ logged: true, user: { name: 'luis', email: 'luis@correo.com' } }}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private route children</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Private route children')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman')
  })
})
