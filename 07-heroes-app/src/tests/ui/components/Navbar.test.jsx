import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { Navbar } from '../../../ui/components/Navbar'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}))

describe('tests in <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'luis',
      email: 'luis@correo.com'
    },
    logout: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks())

  it('should show the user name if he is logged in', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText('luis')).toBeTruthy()
  })

  it('should logout if the user clicks the logout button', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button'))

    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
