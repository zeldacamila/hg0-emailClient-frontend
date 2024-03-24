import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/Login/Login';




test('renders Login component', () => {
  render(<Login />);

  // Verifica que el componente se renderice correctamente
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Sign in')).toBeInTheDocument();
});

test('submits the form with valid data', async () => {
  const mockSignin = jest.fn();
  // Mock la función useSigninMutation
  jest.mock('../../features/auth/authAPI', () => ({
    ...jest.requireActual('../../features/auth/authAPI'),
    useSigninMutation: () => [mockSignin],
  }));

  render(<Login />);

  // Simula la entrada de datos en los campos
  userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  userEvent.type(screen.getByPlaceholderText('Password'), 'password');

  // Simula el envío del formulario
  fireEvent.click(screen.getByText('Sign in'));

  // Espera a que se llame a la función de signin y verifica el comportamiento esperado
  await waitFor(() => {
    expect(mockSignin).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password' });
    // Puedes ajustar estas expectativas según el comportamiento esperado después del inicio de sesión
  });
});
