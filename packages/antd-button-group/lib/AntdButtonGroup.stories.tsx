import React, { useState } from 'react';

import AntdButtonGroup from './AntdButtonGroup';

export default {
  component: AntdButtonGroup,
  title: 'AntdButtonGroup',
  excludeStories: /.*Data$/,
  parameters: {
    componentSubtitle:
      'component which is able to handle button group ui and state',
  },
};

const OPTIONS = [
  {
    all: true,
    text: 'All',
    value: 'all',
  },
  {
    text: 'Waiting',
    value: 'waiting',
  },
  {
    text: 'InProgress',
    value: 'in_progress',
  },
  {
    text: 'Finished',
    value: 'finished',
  },
];

export const Default = () => {
  const [value, setValue] = useState('all');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4>Default</h4>
        <AntdButtonGroup
          value={value}
          options={OPTIONS}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export const Multiple = () => {
  const [value, setValue] = useState(['all']);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h4>Multiple</h4>
        <AntdButtonGroup
          multiple
          value={value}
          options={OPTIONS}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
