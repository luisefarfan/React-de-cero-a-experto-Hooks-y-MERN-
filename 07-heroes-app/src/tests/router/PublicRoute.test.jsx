import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../auth'
import { PublicRoute } from '../../router/PublicRoute'

describe('tests in the <PublicRoute /> component', () => {
  it('should show the children if the user is not authenticated', () => {
    render(
      <AuthContext.Provider value={{ logged: false, user: null }}>
        <PublicRoute>
          <h1>Public route children</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Public route children')).toBeTruthy()
  })

  it('should navigate to /marvel route if the user is authenticated', () => {
    const contextValue = {
      logged: true, user: {
        name: 'Luis',
        email: 'luis@corre.com'
      }
    }

    // We set that we are in the 'login' route
    // The PublicRoute component have a Navigate to the 'marvel' route when the user is logged in
    // So it redirects to the marvel route
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='login' element={<PublicRoute>
              <h1>Public route children</h1>
            </PublicRoute>} />
            <Route path='marvel' element={<h1>Marvel page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel page')).toBeTruthy()
  })
})
