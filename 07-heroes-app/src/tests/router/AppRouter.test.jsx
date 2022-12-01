import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth'
import { AppRouter } from '../../router/AppRouter'

describe('tests in <AppRouter />', () => {
  it('should show the login if the user is not auth', () => {
    const contextValue = {
      logged: false,
      user: null
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    screen.debug()
    expect(screen.getAllByText('Login').length).toBe(2)
  })

  it('should show the marvel component if the user is auth', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'luis',
        email: 'luis@corre.com'
      }
    }

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
  })
})
