import React from 'react';

import AntdInputNumber from './AntdInputNumber';

export default {
  component: AntdInputNumber,
  title: 'AntdInputNumber',
  excludeStories: /.*Data$/,
  parameters: {
    componentSubtitle:
      'component which enhance antd input to be used as inputNumber',
  },
};

// const createMockGet = <T extends unknown>(result: T[], delay = 300) => {
//   return () =>
//     new Promise<T[]>((resolve) => {
//       setTimeout(() => {
//         return resolve(result);
//       }, delay);
//     });
// };

// const promiseFn = createMockGet<Record<string, string | number>>([
//   { id: 1, name: 'Option 1 (value: 1)' },
//   { id: '2', name: 'Option 2 (value: 2)' },
//   { id: 3, name: 'Option 3 (value: 3)' },
//   { id: '4', name: 'Option 4 (value: 4)' },
// ]);

export const Default = () => {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4>Only value</h4>
        <div>Selected value:</div>
        <AntdInputNumber disabled />
      </div>
    </div>
  );
};
