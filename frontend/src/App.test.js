import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './hooks/useAuth';

test('renders login page for unauthenticated user', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const headingElement = screen.getByRole('heading', { name: /login/i });
  expect(headingElement).toBeInTheDocument();
});
