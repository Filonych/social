import { render } from '@testing-library/react';
import { Input } from './index';

test('рендерит компонент Input с Username', () => {
  const { getByPlaceholderText } = render(<Input placeholder="Username" />);
  const inputElement = getByPlaceholderText('Username');
  expect(inputElement).toBeInTheDocument();
});
