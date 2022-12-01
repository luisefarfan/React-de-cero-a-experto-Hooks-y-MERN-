import { render, screen, fireEvent } from '@testing-library/react'
import CounterApp from '../src/CounterApp'

// describe('CounterApp test', () => {
//   it('match snapshot', () => {
//     const { container } = render(<CounterApp />)

//     expect(container).toMatchSnapshot()
//   })

//   it('should have title', () => {
//     const title = 'CounterApp'

//     const { container, getByText, getByTestId } = render(<CounterApp />)
//     expect(getByText(title)).toBeTruthy()

//     // const h1 = container.querySelector('h1')
//     // // Encuentra solo que contenga el string
//     // expect(h1.innerHTML).toContain(title)

//     expect(getByTestId('counterAppTitle').innerHTML).toContain(title)
//   })
// })

// Optimizado
describe('CounterApp test', () => {
  const title = 'CounterApp'
  const initialValue = 10

  it('match snapshot', () => {
    const { container } = render(<CounterApp />)

    expect(container).toMatchSnapshot()
  })

  it('should have title', () => {
    render(<CounterApp />)
    expect(screen.getByText(title)).toBeTruthy()
  })

  it('should have title in h1', () => {
    render(<CounterApp />)
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(title)
  })

  it('should have the initial value passed by props in h2', () => {
    render(<CounterApp value={initialValue} />)
    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain('10')
  })

  it('should increment with +1 button', () => {
    render(<CounterApp value={initialValue} />)
    fireEvent.click(screen.getByText('+1'))

    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain('11')
  })

  it('should decrement with -1 button', () => {
    render(<CounterApp value={initialValue} />)
    fireEvent.click(screen.getByText('-1'))

    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain('9')
  })

  it('should work the reset button', () => {
    render(<CounterApp value={initialValue} />)
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    // fireEvent.click(screen.getByText('Reset'))
    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' })) // Del aria-label

    expect(screen.getByRole('heading', { level: 2 }).innerHTML).toContain(initialValue.toString())
  })
})
