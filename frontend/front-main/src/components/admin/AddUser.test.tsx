import { render, screen, fireEvent } from '@testing-library/react'
import AddUser from './AddUser'
import { BrowserRouter } from 'react-router-dom'

describe('AddUser component', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <AddUser />
      </BrowserRouter>
    )

  it('renders all input fields', () => {
    renderComponent()

    const fieldIds = [
      'username',
      'email',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'address',
    ]

    fieldIds.forEach((id) => {
      const input = screen.getByLabelText(new RegExp(id, 'i'))
      expect(input).toBeInTheDocument()
    })
  })

  it('updates input value on change', () => {
    renderComponent()

    const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: 'janek' } })
    expect(usernameInput.value).toBe('janek')
  })

  it('toggles user roles on checkbox click', () => {
    renderComponent()

    const clientCheckbox = screen.getByRole('checkbox', { name: /client/i }) as HTMLInputElement
    expect(clientCheckbox.checked).toBe(false)

    fireEvent.click(clientCheckbox)
    expect(clientCheckbox.checked).toBe(true)

    fireEvent.click(clientCheckbox)
    expect(clientCheckbox.checked).toBe(false)
  })
})
