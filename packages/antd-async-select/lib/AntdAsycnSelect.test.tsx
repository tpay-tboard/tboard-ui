import { render, screen } from '@testing-library/react';
import React from 'react';

import AntdAsyncSelect from './AntdAsyncSelect';

test('redner AntdAsyncSelect', () => {
  render(<AntdAsyncSelect />);
  expect(screen.getByText('Update Antd AsyncSelect')).toBeInTheDocument();
});
