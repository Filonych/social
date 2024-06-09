import { render } from '@testing-library/react';
import { Input } from './index';

test('рендерит компонент Input с email', () => {
  const { getByPlaceholderText } = render(<Input placeholder="E-mail" />);
  const inputElement = getByPlaceholderText('E-mail');
  expect(inputElement).toBeInTheDocument();
});
