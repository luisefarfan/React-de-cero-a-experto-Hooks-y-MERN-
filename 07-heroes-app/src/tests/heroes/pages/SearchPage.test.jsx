import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../heroes/pages/SearchPage"

const mockedUseNavigate = jest.fn()

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate
}))

describe('tests in <SearchPage /> component', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows correctly with the default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
  })

  it('should show Batman and the input with the batman value', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')

    expect(input.value).toBe('batman')
    expect(screen.getByRole('img').src).toContain('/assets/heroes/dc-batman.jpg')
    expect(screen.getByLabelText('searchHeroDiv').style.display).toBe('none')
  })

  it('should show an error if the hero is not found', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman12345']}>
        <SearchPage />
      </MemoryRouter>
    )

    expect(screen.getByLabelText('noHeroDiv').style.display).toBe('')
  })

  it('should call the navigate when the user enter a hero name with the hero name', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Superman' } })
    const form = screen.getByLabelText('form')
    fireEvent.submit(form)

    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=Superman')
  })
})
