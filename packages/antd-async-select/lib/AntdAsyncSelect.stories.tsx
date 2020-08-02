import 'antd/dist/antd.css';

import { withKnobs } from '@storybook/addon-knobs';
import { Button, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { useRef, useState } from 'react';

import AntdAsyncSelect, { ValueType } from './AntdAsyncSelect';

export default {
  component: AntdAsyncSelect,
  title: 'AntdAsyncSelect',
  excludeStories: /.*Data$/,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle:
      'component which is able to handle async option fethcing',
  },
};

const createMockGet = <T extends unknown>(result: T[], delay = 300) => {
  return () =>
    new Promise<T[]>((resolve) => {
      setTimeout(() => {
        return resolve(result);
      }, delay);
    });
};

const promiseFn = createMockGet<Record<string, string>>([
  { id: '1', name: 'Option 1 (value: 1)' },
  { id: '2', name: 'Option 2 (value: 2)' },
  { id: '3', name: 'Option 3 (value: 3)' },
  { id: '4', name: 'Option 4 (value: 4)' },
]);

export const Default = () => {
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  return (
    <div>
      <div>Selected value: {selected}</div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};

export const OptionInValue = () => {
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  return (
    <div>
      <div>Selected value: {JSON.stringify(selected)}</div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        optionInValue
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};

export const Multiple = () => {
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  return (
    <div>
      <div>Selected value: {JSON.stringify(selected)}</div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        mode="multiple"
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};

export const MultipleOptionInValue = () => {
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  return (
    <div>
      <div>Selected value: {JSON.stringify(selected)}</div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        mode="multiple"
        optionInValue
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};

export const OpenAndCloseSelectProgmatically = () => {
  const selectRef = useRef<Select<SelectValue>>(null);
  const [selected, setSelected] = useState<ValueType>();

  const handleChange = (value: ValueType) => {
    setSelected(value);
  };

  const handleOpen = () => selectRef.current?.focus();
  const handleClose = () => selectRef.current?.blur();

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button.Group>
          <Button onClick={handleOpen}>Open</Button>
          <Button onClick={handleClose}>Close</Button>
        </Button.Group>
      </div>
      <AntdAsyncSelect
        promiseFn={promiseFn}
        ref={selectRef}
        value={selected}
        onChange={handleChange}
      />
    </div>
  );
};
